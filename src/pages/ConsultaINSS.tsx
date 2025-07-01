import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
// import 'aos/dist/aos.css'; // Temporarily commented out to check for style conflicts
import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, CircleAlert, User, Mail, Phone, FileText, SearchCheck, CircleDollarSign } from 'lucide-react';
import MyMaskedInput from '@/components/MyMaskedInput';
import DateTimePicker from '@/components/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import logoSrc from '@/assets/logo.png'; // Import the logo

interface IFormInput {
    nome: string;
    email: string;
    telefone: string;
    valorPensao: string;
    tempoContribuicao: string;
}

// Interface for the data sent to n8n
interface ISubmissionData extends IFormInput {
    selectedDate: string;
    selectedTime: string;
    zoomLink?: string; // Add new field for Zoom link
}

// Add type for booked slots
interface BookedSlot {
    booked_date: string;
    booked_time: string;
}

const ConsultaINSS: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty }, // isSubmitting will be used for the final submission
        watch,
        reset,
        getValues, // Added getValues
    } = useForm<IFormInput>({
        defaultValues: {
            nome: '',
            email: '',
            telefone: '',
            valorPensao: '',
            tempoContribuicao: '',
        },
        mode: 'onChange'
    });
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formData, setFormData] = useState<IFormInput | null>(null);
    const [isSubmittingToN8N, setIsSubmittingToN8N] = useState(false); // New state for final submission
    const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]); // New state for booked slots
    const [isNavigatingToThankYou, setIsNavigatingToThankYou] = useState(false); // Added state

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    // Refs for critical states to ensure latest value is read in async/event contexts
    const isNavigatingToThankYouRef = useRef(isNavigatingToThankYou);
    const isSubmittingToN8NRef = useRef(isSubmittingToN8N);

    useEffect(() => {
        isNavigatingToThankYouRef.current = isNavigatingToThankYou;
    }, [isNavigatingToThankYou]);

    useEffect(() => {
        isSubmittingToN8NRef.current = isSubmittingToN8N;
    }, [isSubmittingToN8N]);

    useEffect(() => {
        const missing = [];
        const currentValues = getValues(); // Use getValues for immediate state
        if (!currentValues.nome) missing.push('Nome');
        if (!currentValues.email) missing.push('Email');
        if (!currentValues.telefone) missing.push('Telefone');
        if (!currentValues.valorPensao) missing.push('Valor da Pensão');
        if (!currentValues.tempoContribuicao) missing.push('Tempo de Contribuição');
        setMissingFields(missing);
    }, [
        getValues, // getValues is stable, but we want to react to field changes for UI
        watch('nome'), // Re-run when these specific fields change for the missingFields UI
        watch('email'),
        watch('telefone'),
        watch('valorPensao'),
        watch('tempoContribuicao')
    ]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }, []);

    // Fetch booked slots when date picker is shown
    useEffect(() => {
        if (showDatePicker) {
            const fetchBookedSlots = async () => {
                try {
                    const response = await fetch('https://nrzftrxvlmtdlgyjyypz.supabase.co/rest/v1/booked_slots?select=booked_date,booked_time', {
                        headers: {
                            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI', // Your anon public key
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI' // Your anon public key
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch booked slots: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setBookedSlots(data);
                } catch (error) {
                    console.error("Error fetching booked slots:", error);
                    setSubmissionError('Não foi possível carregar os horários. Tente novamente.'); // Inform user
                }
            };
            fetchBookedSlots();
        }
    }, [showDatePicker]);

    // Effect to handle abandoned leads
    useEffect(() => {
        // CONSOLE LOG 4: Check if useEffect itself runs and listeners are attached
        console.log('[AbandonedLead] useEffect for abandoned leads RUNNING. Attaching listeners.');

        const sendAbandonedLeadData = async () => {
            const formValues = getValues(); // Get current values at the moment of execution
            const isAnyFieldFilled = Object.values(formValues).some(
                (value) => value && typeof value === 'string' && value.trim() !== ''
            );

            // CONSOLE LOG 1 & 2: Check if function is entered and basic conditions
            console.log('[AbandonedLead] sendAbandonedLeadData entered. isAnyFieldFilled:', isAnyFieldFilled);
            console.log('[AbandonedLead] Conditions check: isNavigatingToThankYou:', isNavigatingToThankYouRef.current, '| isSubmittingToN8N:', isSubmittingToN8NRef.current/*, '| showDatePicker:', showDatePickerRef.current*/);

            if (
                !isNavigatingToThankYouRef.current &&
                !isSubmittingToN8NRef.current &&
                isAnyFieldFilled
                // && !showDatePickerRef.current // This condition is removed
            ) {
                console.log('[AbandonedLead] Main IF condition MET. Attempting to send data.');
                const payload = {
                    nome: formValues.nome || null,
                    email: formValues.email || null,
                    telefone: formValues.telefone || null,
                    valorpensao: formValues.valorPensao || null,
                    tempocontribuicao: formValues.tempoContribuicao || null,
                };

                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                const url = 'https://nrzftrxvlmtdlgyjyypz.supabase.co/rest/v1/abandoned_leads';
                const headers = {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI',
                    'Prefer': 'return=minimal'
                    // Content-Type is set by the Blob for sendBeacon
                };

                // For sendBeacon, headers need to be part of the URL for some services or handled by a proxy/cloud function if strict header requirements exist
                // Supabase REST API expects headers for auth. sendBeacon doesn't directly support setting arbitrary headers like fetch.
                // This means direct sendBeacon to Supabase with API key in header might not work.
                // Let's try fetch with keepalive again, but with more robust logging for the request itself.

                // Reverting to fetch with keepalive due to sendBeacon header limitations for Supabase direct API calls.
                // Adding a console log specifically before the fetch call.
                console.log('[AbandonedLead] Attempting fetch with keepalive. Payload:', JSON.stringify(payload));

                // Using synchronous XMLHttpRequest as a last resort for page unload
                try {
                    const xhr = new XMLHttpRequest();
                    // The third parameter `false` makes it synchronous
                    xhr.open('POST', url, false);

                    // Set Supabase headers
                    xhr.setRequestHeader('apikey', headers.apikey);
                    xhr.setRequestHeader('Authorization', headers.Authorization);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Prefer', headers.Prefer);

                    xhr.send(JSON.stringify(payload));

                    // For synchronous XHR, we check status after send() completes
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('[AbandonedLead] Synchronous XHR successful. Status:', xhr.status);
                    } else {
                        console.error('[AbandonedLead] Synchronous XHR error. Status:', xhr.status, 'Response:', xhr.responseText);
                    }
                } catch (error: any) {
                    // This catch block might not be very effective for sync XHR errors during unload,
                    // but it's here for completeness.
                    console.error('[AbandonedLead] Synchronous XHR catch block error:', error.name, error.message, error);
                }
            } else {
                console.log('[AbandonedLead] Main IF condition NOT MET. No data send attempt.');
            }
        };

        window.addEventListener('beforeunload', sendAbandonedLeadData);

        return () => {
            // CONSOLE LOG 5: Check if cleanup function runs
            console.log('[AbandonedLead] useEffect cleanup. Removing beforeunload listener. Calling sendAbandonedLeadData for unmount/SPA navigation.');
            window.removeEventListener('beforeunload', sendAbandonedLeadData);
            sendAbandonedLeadData(); // Call on unmount (covers SPA navigation)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues]); // getValues is stable from react-hook-form. Refs are managed by their own effects.

    // This function now only handles the first step: validating and showing date picker
    const onInitialFormSubmit = (data: IFormInput) => {
        setSubmissionError(null); // Clear previous errors
        if (missingFields.length > 0 && !showDatePicker) { // only show missing fields error if date picker not yet shown
            setSubmissionError(`Por favor, preencha os seguintes campos: ${missingFields.join(', ')}`);
            return;
        }
        setFormData(data); // Store data from the first form
        setShowDatePicker(true); // Show the date picker
    };

    const handleDateTimeSelect = async (date: Date, time: string) => {
        if (formData) {
            setIsSubmittingToN8N(true);
            setSubmissionError(null);
            const completeFormData: ISubmissionData = {
                ...formData,
                selectedDate: date.toISOString(),
                selectedTime: time,
                zoomLink: '', // Initialize Zoom link field
            };

            try {
                // API call to n8n webhook with ALL data
                await axios.post('https://cesarhseabra.app.n8n.cloud/webhook/form-submission', completeFormData);

                // Proceed to thank you page
                const { nome, email, telefone } = formData; // Destructure only what's needed for the URL
                setIsNavigatingToThankYou(true); // Set flag BEFORE navigating
                navigate(`/obrigado?name=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(telefone)}&date=${encodeURIComponent(date.toISOString())}&time=${encodeURIComponent(time)}`);

            } catch (error) {
                console.error('Submission error to n8n:', error);
                if (axios.isAxiosError(error)) {
                    if (error.code === 'ERR_NETWORK') {
                        setSubmissionError('Erro de conexão com o servidor. Por favor, verifique sua conexão ou tente novamente.');
                    } else {
                        setSubmissionError(`Erro ao enviar agendamento: ${error.message}. Tente novamente ou contate-nos.`);
                    }
                } else {
                    setSubmissionError('Ocorreu um erro inesperado ao enviar seu agendamento. Tente novamente ou contate-nos.');
                }
            } finally {
                setIsSubmittingToN8N(false);
            }
        }
    };

    const tempoContribuicaoOptions = Array.from({ length: 40 }, (_, i) => (i + 1).toString());

    const baseInputStyles = "appearance-none block w-full px-4 py-3.5 border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-law-gold sm:text-sm bg-law-black text-law-white transition-all duration-300 ease-in-out";
    const inputBorderStyles = "border-law-blue-dark hover:border-law-gold/70";
    const inputWithIconPadding = "pl-12";

    return (
        <>
            <Helmet>
                <title>Consulta Urgente INSS | Seabra & Moura Santos Advogados</title>
                <meta
                    name="description"
                    content="Sofreu um golpe no INSS? Seu benefício foi reduzido? Agende uma consulta urgente e gratuita com nosso escritório especializado em Direito Previdenciário."
                />
                {/* Facebook Pixel Code */}
                <script>
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1748150686076875');
                        fbq('track', 'PageView');
                    `}
                </script>
                <noscript>
                    {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1748150686076875&ev=PageView&noscript=1" />`}
                </noscript>
                {/* End Facebook Pixel Code */}
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <div className="max-w-3xl w-full space-y-10" data-aos="fade-up">
                    {!showDatePicker ? (
                        <>
                            <div className="text-center space-y-3">
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-law-white">
                                    Recupere até <span className="gold-gradient-text block text-5xl sm:text-6xl md:text-7xl">R$10.000</span> Direto na Sua Conta
                                </h1>
                                <p className="text-lg sm:text-xl text-law-white-light/95 max-w-2xl mx-auto pt-2">
                                    Descontos não autorizados em seu benefício são ilegais. A lei garante a devolução de tudo que foi pago indevidamente nos últimos 5 anos, com juros e correção. Nossa análise gratuita revela o valor exato e inicia o processo para que você receba o que é seu por direito.
                                </p>
                            </div>

                            {/* Steps Section */}
                            <div className="my-10 sm:my-12" data-aos="fade-up" data-aos-delay="100">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                                    <div className="flex flex-col items-center p-4" data-aos="fade-up" data-aos-delay="200">
                                        <div className="bg-law-gold/10 p-4 rounded-full mb-4 border border-law-gold/20">
                                            <FileText className="h-8 w-8 text-law-gold" />
                                        </div>
                                        <h3 className="font-bold text-lg text-law-white">1. Preencha e Agende</h3>
                                        <p className="text-sm text-law-white-light/80 mt-1">Use o formulário para marcar rapidamente uma consulta gratuita com nosso time de especialistas.</p>
                                    </div>
                                    <div className="flex flex-col items-center p-4" data-aos="fade-up" data-aos-delay="300">
                                        <div className="bg-law-gold/10 p-4 rounded-full mb-4 border border-law-gold/20">
                                            <SearchCheck className="h-8 w-8 text-law-gold" />
                                        </div>
                                        <h3 className="font-bold text-lg text-law-white">2. Análise do Caso</h3>
                                        <p className="text-sm text-law-white-light/80 mt-1">Na reunião, nossos advogados analisarão seu extrato para identificar os descontos indevidos e calcular os valores a reaver.</p>
                                    </div>
                                    <div className="flex flex-col items-center p-4" data-aos="fade-up" data-aos-delay="400">
                                        <div className="bg-law-gold/10 p-4 rounded-full mb-4 border border-law-gold/20">
                                            <CircleDollarSign className="h-8 w-8 text-law-gold" />
                                        </div>
                                        <h3 className="font-bold text-lg text-law-white">3. Ação de Recuperação</h3>
                                        <p className="text-sm text-law-white-light/80 mt-1">Com sua autorização, entramos com a ação judicial para reaver seu dinheiro, acrescido de juros e correção.</p>
                                    </div>
                                </div>
                            </div>

                            <Form.Root
                                ref={formRef}
                                onSubmit={handleSubmit(onInitialFormSubmit)} // Changed to onInitialFormSubmit
                                className="space-y-6 bg-law-black-lighter/80 backdrop-blur-sm p-8 sm:p-10 rounded-xl shadow-2xl border border-law-blue-dark/30"
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-law-gold tracking-wide">Dê o Primeiro Passo Para Recuperar Seu Dinheiro</h2>
                                    <p className="text-law-white-light/90 mt-1">Preencha seus dados para iniciarmos a sua análise gratuita e obrigatória.</p>
                                </div>
                                {/* Nome */}
                                <Form.Field name="nome" className="space-y-1.5">
                                    <Form.Label className="text-sm font-semibold text-law-white tracking-wide">Nome Completo</Form.Label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <Controller
                                            name="nome"
                                            control={control}
                                            rules={{ required: 'Nome é obrigatório' }}
                                            render={({ field }) => (
                                                <Form.Control asChild>
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        className={`${baseInputStyles} ${inputBorderStyles} ${inputWithIconPadding}`}
                                                        placeholder="Seu nome completo"
                                                        disabled={isSubmitting} // Keep this disabled state for initial form
                                                    />
                                                </Form.Control>
                                            )}
                                        />
                                    </div>
                                    {errors.nome && (
                                        <Form.Message className="text-xs text-red-400 flex items-center pt-1">
                                            <CircleAlert size={14} className="mr-1.5 flex-shrink-0" /> {errors.nome.message}
                                        </Form.Message>
                                    )}
                                </Form.Field>

                                {/* Email */}
                                <Form.Field name="email" className="space-y-1.5">
                                    <Form.Label className="text-sm font-semibold text-law-white tracking-wide">Email</Form.Label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: 'Email é obrigatório',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Digite um email válido'
                                                }
                                            }}
                                            render={({ field }) => (
                                                <Form.Control asChild>
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        className={`${baseInputStyles} ${inputBorderStyles} ${inputWithIconPadding}`}
                                                        placeholder="seuemail@exemplo.com"
                                                        disabled={isSubmitting}
                                                    />
                                                </Form.Control>
                                            )}
                                        />
                                    </div>
                                    {errors.email && (
                                        <Form.Message className="text-xs text-red-400 flex items-center pt-1">
                                            <CircleAlert size={14} className="mr-1.5 flex-shrink-0" /> {errors.email.message}
                                        </Form.Message>
                                    )}
                                </Form.Field>

                                {/* Telefone */}
                                <Form.Field name="telefone" className="space-y-1.5">
                                    <Form.Label className="text-sm font-semibold text-law-white tracking-wide">Telefone (WhatsApp)</Form.Label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <Controller
                                            name="telefone"
                                            control={control}
                                            rules={{
                                                required: 'Telefone é obrigatório',
                                                pattern: {
                                                    value: /^\([1-9]{2}\)\s9[0-9]{4}-[0-9]{4}$/,
                                                    message: 'Digite um número de celular válido'
                                                },
                                                validate: {
                                                    validLength: (value) => {
                                                        const numbersOnly = value.replace(/\D/g, '');
                                                        return numbersOnly.length === 11 || 'Número incompleto';
                                                    }
                                                }
                                            }}
                                            render={({ field }) => (
                                                <Form.Control asChild>
                                                    <MyMaskedInput
                                                        {...field}
                                                        mask="(99) 99999-9999"
                                                        disabled={isSubmitting}
                                                        className={`${baseInputStyles} ${inputBorderStyles} ${inputWithIconPadding}`}
                                                        placeholder="(XX) 9XXXX-XXXX"
                                                    />
                                                </Form.Control>
                                            )}
                                        />
                                    </div>
                                    {errors.telefone && (
                                        <Form.Message className="text-xs text-red-400 flex items-center pt-1">
                                            <CircleAlert size={14} className="mr-1.5 flex-shrink-0" /> {errors.telefone.message}
                                        </Form.Message>
                                    )}
                                </Form.Field>

                                {/* Valor da Pensão */}
                                <Form.Field name="valorPensao" className="space-y-2.5">
                                    <Form.Label className="text-sm font-semibold text-law-white tracking-wide">Valor da Pensão/Benefício</Form.Label>
                                    <Controller
                                        name="valorPensao"
                                        control={control}
                                        rules={{ required: 'Selecione o valor da pensão' }}
                                        render={({ field }) => (
                                            <RadioGroup.Root
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
                                                disabled={isSubmitting}
                                            >
                                                {[
                                                    'Abaixo de R$2.000',
                                                    'Entre R$2.000 e R$5.000',
                                                    'Entre R$5.000 e R$10.000',
                                                    'Mais de R$10.000',
                                                ].map((option) => (
                                                    <div key={option} className="flex items-center">
                                                        <RadioGroup.Item
                                                            value={option}
                                                            id={option.replace(/\s+/g, '-')}
                                                            className="peer h-5 w-5 cursor-pointer rounded-full border border-law-blue-dark text-law-gold focus:ring-2 focus:ring-law-gold focus:ring-offset-2 focus:ring-offset-law-black-lighter bg-law-black transition-all duration-300 hover:border-law-gold/70 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            disabled={isSubmitting}
                                                        >
                                                            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-law-gold" />
                                                        </RadioGroup.Item>
                                                        <label htmlFor={option.replace(/\s+/g, '-')} className={`ml-3 block text-sm text-law-white-light cursor-pointer peer-hover:text-law-gold/80 transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </RadioGroup.Root>
                                        )}
                                    />
                                    {errors.valorPensao && (
                                        <Form.Message className="text-xs text-red-400 flex items-center pt-1">
                                            <CircleAlert size={14} className="mr-1.5 flex-shrink-0" /> {errors.valorPensao.message}
                                        </Form.Message>
                                    )}
                                </Form.Field>

                                {/* Tempo de Contribuição */}
                                <Form.Field name="tempoContribuicao" className="space-y-1.5">
                                    <Form.Label className="text-sm font-semibold text-law-white tracking-wide">Tempo do Benefício</Form.Label>
                                    <Controller
                                        name="tempoContribuicao"
                                        control={control}
                                        rules={{ required: "Tempo do benefício é obrigatório" }}
                                        render={({ field }) => (
                                            <Select.Root onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                                                <Select.Trigger
                                                    className={`${baseInputStyles} ${inputBorderStyles} inline-flex items-center justify-between pr-3 text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                                    aria-label="Tempo de Benefício"
                                                    disabled={isSubmitting}
                                                >
                                                    <Select.Value placeholder="Selecione o tempo em anos" />
                                                    <Select.Icon className="text-gray-400">
                                                        <ChevronDownIcon size={20} />
                                                    </Select.Icon>
                                                </Select.Trigger>
                                                <Select.Portal>
                                                    <Select.Content
                                                        position="popper"
                                                        sideOffset={5}
                                                        align="center"
                                                        className="z-50 w-72 rounded-md bg-law-black-lighter shadow-2xl border border-law-blue-dark/50 backdrop-blur-sm mt-1 overflow-hidden"
                                                    >
                                                        <Select.ScrollUpButton className="flex items-center justify-center h-7 cursor-default text-gray-400 hover:text-law-gold">
                                                            <ChevronUpIcon size={18} />
                                                        </Select.ScrollUpButton>
                                                        <Select.Viewport className="p-1.5 max-h-56">
                                                            {tempoContribuicaoOptions.map((anos) => (
                                                                <Select.Item
                                                                    key={anos}
                                                                    value={anos}
                                                                    className="text-base leading-none text-law-white rounded-md flex items-center h-10 pr-4 pl-9 relative select-none data-[disabled]:text-gray-600 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-law-gold data-[highlighted]:text-law-black cursor-pointer transition-colors duration-150"
                                                                >
                                                                    <Select.ItemText>{anos === '1' ? `${anos} ano` : `${anos} anos`}</Select.ItemText>
                                                                    <Select.ItemIndicator className="absolute left-0 w-9 inline-flex items-center justify-center text-law-gold">
                                                                        <CheckIcon size={16} />
                                                                    </Select.ItemIndicator>
                                                                </Select.Item>
                                                            ))}
                                                        </Select.Viewport>
                                                        <Select.ScrollDownButton className="flex items-center justify-center h-7 cursor-default text-gray-400 hover:text-law-gold">
                                                            <ChevronDownIcon size={18} />
                                                        </Select.ScrollDownButton>
                                                    </Select.Content>
                                                </Select.Portal>
                                            </Select.Root>
                                        )}
                                    />
                                    {errors.tempoContribuicao && (
                                        <Form.Message className="text-xs text-red-400 flex items-center pt-1">
                                            <CircleAlert size={14} className="mr-1.5 flex-shrink-0" /> {errors.tempoContribuicao.message}
                                        </Form.Message>
                                    )}
                                </Form.Field>

                                {submissionError && !showDatePicker && ( // Only show initial form submission errors here
                                    <div className="rounded-md bg-red-900/80 backdrop-blur-sm p-4 border border-red-700">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <CircleAlert className="h-5 w-5 text-red-300" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-red-200">
                                                    {submissionError}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Form.Submit asChild>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isValid || !isDirty} // Removed isSubmittingToN8N from here
                                        className="w-full group flex items-center justify-center py-3.5 px-4 border border-transparent rounded-md shadow-md text-base font-semibold text-law-black bg-law-gold hover:bg-law-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-law-black-lighter focus:ring-law-gold disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-t-2 border-law-black mr-3"></div>
                                                Processando...
                                            </>
                                        ) : (
                                            <>
                                                {missingFields.length > 0 ? (
                                                    'Preencha para continuar'
                                                ) : (
                                                    'AGENDAR MINHA ANÁLISE GRATUITA' // Button text changed
                                                )}
                                            </>
                                        )}
                                    </button>
                                </Form.Submit>
                            </Form.Root>
                        </>
                    ) : (
                        <>
                            <div className="text-center" data-aos="fade-up">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-law-gold mb-4">
                                    Agende sua Consulta
                                </h2>
                                <p className="mt-2 text-lg text-law-white-light max-w-xl mx-auto">
                                    Escolha a melhor data e horário para sua consulta gratuita.
                                </p>
                                {isSubmittingToN8N && (
                                    <div className="mt-4 flex items-center justify-center text-law-gold">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-t-2 border-law-gold mr-3"></div>
                                        Enviando seu agendamento...
                                    </div>
                                )}
                                {submissionError && showDatePicker && ( // Only show n8n submission errors here
                                    <div className="mt-4 rounded-md bg-red-900/80 backdrop-blur-sm p-4 border border-red-700 max-w-md mx-auto" data-aos="fade-up">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <CircleAlert className="h-5 w-5 text-red-300" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-red-200">
                                                    {submissionError}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DateTimePicker
                                onSelect={handleDateTimeSelect}
                                className="mt-8"
                                disabledDates={[]}
                                availableTimes={[
                                    '09:00', '10:00', '11:00',
                                    '14:00', '15:00', '16:00',
                                    '17:00'
                                ]}
                                bookedSlots={bookedSlots}
                            />
                        </>
                    )}
                    <img src={logoSrc} alt="Seabra & Moura Santos Advogados Logo" className="mx-auto h-28 w-auto mt-16 mb-8" data-aos="fade-up" data-aos-delay="200" />
                </div>
            </div>
        </>
    );
};

export default ConsultaINSS; 