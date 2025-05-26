const axios = require('axios');

// --- CONFIGURATION ---
const WPPCONNECT_API_URL = 'http://localhost:3001/send-message';

// IMPORTANT: Replace with YOUR WhatsApp number (including country code, no symbols)
// This is the number the message will be SENT TO.
const RECIPIENT_PHONE_NUMBER = '5521991875887'; // e.g., '5511999999999'

const MESSAGE_TO_SEND = 'This is a direct test message from test-send.js! ✅';
// --- END CONFIGURATION ---

async function sendTestMessage() {
  if (RECIPIENT_PHONE_NUMBER === 'YOUR_WHATSAPP_NUMBER' || !RECIPIENT_PHONE_NUMBER) {
    console.error('🔴 ERROR: Please update RECIPIENT_PHONE_NUMBER in test-send.js with your WhatsApp number (and ensure it is not the placeholder value).');
    return;
  }

  console.log(`Attempting to send message to: ${RECIPIENT_PHONE_NUMBER}`);
  console.log(`Message: "${MESSAGE_TO_SEND}"`);
  console.log(`API Endpoint: ${WPPCONNECT_API_URL}`);

  try {
    const response = await axios.post(WPPCONNECT_API_URL, {
      to: RECIPIENT_PHONE_NUMBER,
      message: MESSAGE_TO_SEND
    });

    console.log('✅ Message sent successfully via API!');
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('🔴 ERROR sending message via API:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      console.error('Is the WPPConnect API server (server.js) running at http://localhost:3001 ?');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
  }
}

sendTestMessage(); 