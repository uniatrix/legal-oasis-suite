import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Calendar, AlertCircle, CheckIcon, PlayCircle } from 'lucide-react';
import AOS from 'aos';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useSearchParams } from 'react-router-dom';
import logoSrc from '@/assets/logo.png';

const Obrigado: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [isChecked, setIsChecked] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const name = searchParams.get('name') || '';
    const date = searchParams.get('date') ? new Date(searchParams.get('date')!) : null;
    const time = searchParams.get('time') || '';

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50,
        });
    }, []);

    const handleConfirm = () => {
        if (isChecked) {
            setShowSuccess(true);
            // Here you can add API call to confirm attendance
        }
    };

    return (
        <>
            <Helmet>
                <title>Agendamento Confirmado | Seabra & Moura Santos Advogados</title>
                <meta
                    name="description"
                    content="Seu agendamento foi confirmado. Agradecemos sua confiança e preparamos informações importantes para você."
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
                        fbq('track', 'Lead');
                    `}
                </script>
                <noscript>
                    {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1748150686076875&ev=PageView&noscript=1" />`}
                </noscript>
                {/* End Facebook Pixel Code */}
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                    {/* Thank You Message */}
                    <div className="text-center" data-aos="fade-down">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2
                                size={72}
                                className="text-law-gold animate-[pulse_2.5s_ease-in-out_infinite]"
                            />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-law-gold">
                            Agendamento Confirmado!
                        </h1>
                        <p className="text-lg sm:text-xl text-law-white-light max-w-xl mx-auto mt-2">
                            {name && `Olá, ${name.split(' ')[0]}! `}
                            Sua consulta conosco foi marcada com sucesso. Estamos ansiosos para atendê-lo(a).
                        </p>
                    </div>

                    {/* Appointment Details */}
                    <div
                        className="bg-law-black-lighter/70 backdrop-blur-lg rounded-xl border border-law-blue-dark/40 shadow-2xl p-6 sm:p-8"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-lg mb-6">
                            <Calendar className="text-law-gold flex-shrink-0" size={32} />
                            <span className="leading-relaxed">
                                Sua consulta está agendada para{' '}
                                <strong className="text-law-gold font-semibold">
                                    {date?.toLocaleDateString('pt-BR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                    })}
                                </strong>
                                {' '}às{' '}
                                <strong className="text-law-gold font-semibold">{time}</strong>.
                            </span>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-law-blue-darker/60 rounded-lg p-5 sm:p-6 flex items-start gap-4 border border-law-blue-dark/50">
                            <AlertCircle className="text-law-gold flex-shrink-0 mt-1" size={24} />
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-law-gold">
                                    Informações Importantes:
                                </h3>
                                <ul className="space-y-1.5 text-law-white-light/90 text-sm sm:text-base list-disc list-inside pl-1">
                                    <li>Chegue com 10 minutos de antecedência.</li>
                                    <li>Traga seus documentos pessoais e qualquer documentação relevante para o caso.</li>
                                    <li>Em caso de imprevisto, por favor, avise-nos com antecedência.</li>
                                    <li className="font-semibold">O não comparecimento sem aviso prévio pode impactar futuros agendamentos.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div
                        className="bg-law-black-lighter/70 backdrop-blur-lg rounded-xl border border-law-blue-dark/40 shadow-2xl p-6 sm:p-8"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="flex items-center gap-3 mb-4 sm:mb-5">
                            <PlayCircle className="text-law-gold flex-shrink-0" size={32} />
                            <h2 className="text-xl sm:text-2xl font-semibold text-law-gold">
                                Uma Mensagem Importante Para Você
                            </h2>
                        </div>
                        <p className="text-law-white-light/90 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed">
                            Enquanto aguarda sua consulta, preparamos um vídeo especial. Descubra como nossa equipe pode ajudá-lo(a) a navegar pelas complexidades do INSS e o que esperar do nosso encontro. Clique no play e assista agora!
                        </p>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-law-black/60 border border-law-blue-dark/50 shadow-inner">
                            {/* Replace src with your video URL */}
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example Video - REPLACE THIS
                                title="Mensagem de Boas-vindas Importante"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Confirmation Section */}
                    <div
                        className="bg-law-black-lighter/70 backdrop-blur-lg rounded-xl border border-law-blue-dark/40 shadow-2xl p-6 sm:p-8"
                        data-aos="fade-up"
                        data-aos-delay="450"
                    >
                        <div className="space-y-5">
                            <div className="flex items-start sm:items-center gap-3">
                                <Checkbox.Root
                                    id="confirm-attendance"
                                    checked={isChecked}
                                    onCheckedChange={(checked) => setIsChecked(checked === true)}
                                    className="h-5 w-5 sm:h-6 sm:w-6 mt-1 sm:mt-0 rounded bg-law-black border-2 border-law-blue-dark hover:border-law-gold focus:ring-2 focus:ring-law-gold focus:ring-offset-2 focus:ring-offset-law-black-lighter transition-all duration-300 flex-shrink-0"
                                >
                                    <Checkbox.Indicator className="flex items-center justify-center w-full h-full">
                                        <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-law-gold" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                <label
                                    htmlFor="confirm-attendance"
                                    className="text-base sm:text-lg text-law-white-light cursor-pointer leading-tight"
                                >
                                    Confirmo minha presença e que li as informações importantes.
                                </label>
                            </div>

                            <button
                                onClick={handleConfirm}
                                disabled={!isChecked || showSuccess}
                                className={`
                                    w-full flex items-center justify-center py-3.5 sm:py-4 px-6 rounded-lg text-base sm:text-lg font-semibold
                                    transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-law-black-lighter
                                    ${showSuccess
                                        ? 'bg-green-500 text-white cursor-default shadow-md'
                                        : isChecked
                                            ? 'bg-law-gold text-law-black hover:bg-law-gold-dark focus:ring-law-gold hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-law-gold/30'
                                            : 'bg-gray-600/70 text-gray-400 cursor-not-allowed shadow-md'
                                    }
                                `}
                            >
                                <span className="flex items-center gap-2">
                                    <CheckIcon size={22} />
                                    Presença Confirmada!
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <img src={logoSrc} alt="Seabra & Moura Santos Advogados Logo" className="mx-auto h-28 w-auto mt-12 sm:mt-16 mb-8" data-aos="fade-up" data-aos-delay="700" />
            </div>
        </>
    );
};

export default Obrigado; 