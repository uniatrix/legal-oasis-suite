const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Render will set the PORT environment variable

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

let whatsappClient;
let qrCodeDataUrl = '';
let clientStatus = 'Initializing...';

console.log('Starting WPPConnect setup...');

wppconnect
  .create({
    session: 'legal-oasis-bot',
    catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
      console.log('QR RECEIVED');
      qrCodeDataUrl = base64Qr;
      clientStatus = 'QR Code received. Please scan with WhatsApp.';
      // You can optionally display asciiQR in the console
      // console.log(asciiQR);
    },
    statusFind: (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWPPconnect || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      console.log('Session name: ', session);
      clientStatus = statusSession;
      if (statusSession === 'isLogged' || statusSession === 'successChat' || statusSession === 'chatsAvailable') {
        qrCodeDataUrl = ''; // Clear QR code once logged in
        clientStatus = 'WhatsApp client connected and ready!';
      }
    },
    headless: true, // Run in headless mode (essential for servers)
    puppeteerOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        // '--single-process', // Disabling this as it might cause issues, but can be tested
        '--disable-gpu'
      ],
    },
    logQR: true, // Logs QR automatically in terminal
    browserWS: '', // Optional: connect to an existing browser session
    autoClose: 0, // Temporarily disable autoClose for debugging
    createPathFileToken: true, // Create a token file for session persistence
    waitForLogin: false, // Try resolving create() promise sooner
  })
  .then((client) => {
    whatsappClient = client;
    clientStatus = 'WhatsApp client initialized. Waiting for QR scan or successful connection.';
    console.log('WPPConnect client created. Ready to send messages once logged in.');
    startApi();
  })
  .catch((error) => {
    clientStatus = 'Error initializing WPPConnect.';
    console.error('Error creating WPPConnect client:', error);
    // Optionally, attempt to start the API anyway to serve status/QR even if client failed.
    startApi(); 
  });

function startApi() {
  app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
  });

  app.get('/', (req, res) => {
    // Temporarily simplify for health check and basic access
    if (qrCodeDataUrl) {
      res.send(`
        <h1>WPPConnect QR Code</h1>
        <p>Client Status: <strong>${clientStatus}</strong></p>
        <img src="${qrCodeDataUrl}" alt="QR Code" />
        <p>Scan with WhatsApp. Refresh if status doesn't change after scan.</p>
      `);
    } else {
      res.send(`
        <h1>WPPConnect API Status</h1>
        <p>Client Status: <strong>${clientStatus}</strong></p>
        <p>${clientStatus === 'Initializing...' || clientStatus.includes('QR') ? 'Generating QR Code, please wait and refresh...' : 'Not currently showing QR code. Refresh to check.'}</p>
      `);
    }
  });

  app.post('/send-message', async (req, res) => {
    if (!whatsappClient) {
      return res.status(500).json({ success: false, message: 'WhatsApp client not initialized.' });
    }
    if (clientStatus !== 'isLogged' && clientStatus !== 'successChat' && clientStatus !== 'chatsAvailable') {
      return res.status(503).json({ success: false, message: `WhatsApp client not ready. Status: ${clientStatus}` });
    }

    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ success: false, message: 'Missing `to` or `message` in request body.' });
    }

    // Format 'to' number to WPPConnect format (e.g., 5511999999999@c.us)
    const formattedTo = `${to.replace(/\D/g, '')}@c.us`;

    try {
      console.log(`Attempting to send message to ${formattedTo}`);
      await whatsappClient.sendText(formattedTo, message);
      console.log(`Message sent successfully to ${formattedTo}`);
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, message: 'Failed to send message.', error: error.toString() });
    }
  });

  app.listen(PORT, () => {
    console.log(`WPPConnect API server running on http://localhost:${PORT}`);
    console.log(`If deploying, Render will use its own host and port.`);
  });
} 