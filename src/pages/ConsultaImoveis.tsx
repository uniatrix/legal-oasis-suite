import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";
import AOS from "aos";
import * as Form from "@radix-ui/react-form";
import {
  CircleAlert,
  User,
  Mail,
  Phone,
  Shield,
  Award,
  Users,
  MessageCircle,
  SearchCheck,
  Building2,
} from "lucide-react";
import MyMaskedInput from "@/components/MyMaskedInput";
import { useNavigate } from "react-router-dom";

// TypeScript declaration for Facebook Pixel
declare global {
  interface Window {
    fbq: (action: string, event: string, parameters?: any) => void;
  }
}

interface IFormInput {
  nome: string;
  email: string;
  telefone: string;
}

const ConsultaImoveis: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
    getValues,
  } = useForm<IFormInput>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
    },
    mode: "onChange",
  });
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [isNavigatingToThankYou, setIsNavigatingToThankYou] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Refs for critical states to ensure latest value is read in async/event contexts
  const isNavigatingToThankYouRef = useRef(isNavigatingToThankYou);

  useEffect(() => {
    isNavigatingToThankYouRef.current = isNavigatingToThankYou;
  }, [isNavigatingToThankYou]);

  useEffect(() => {
    const missing = [];
    const currentValues = getValues();
    if (!currentValues.nome) missing.push("Nome");
    if (!currentValues.email) missing.push("Email");
    if (!currentValues.telefone) missing.push("WhatsApp");
    setMissingFields(missing);
  }, [getValues, watch("nome"), watch("email"), watch("telefone")]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  // Effect to handle abandoned leads
  useEffect(() => {
    console.log(
      "[AbandonedLead] useEffect for abandoned leads RUNNING. Attaching listeners."
    );

    const sendAbandonedLeadData = async () => {
      const formValues = getValues();
      const isAnyFieldFilled = Object.values(formValues).some(
        (value) => value && typeof value === "string" && value.trim() !== ""
      );

      console.log(
        "[AbandonedLead] sendAbandonedLeadData entered. isAnyFieldFilled:",
        isAnyFieldFilled
      );
      console.log(
        "[AbandonedLead] Conditions check: isNavigatingToThankYou:",
        isNavigatingToThankYouRef.current,
        "| isSubmitting:",
        isSubmitting
      );

      if (
        !isNavigatingToThankYouRef.current &&
        !isSubmitting &&
        isAnyFieldFilled
      ) {
        console.log(
          "[AbandonedLead] Main IF condition MET. Attempting to send data."
        );
        const payload = {
          nome: formValues.nome || null,
          email: formValues.email || null,
          telefone: formValues.telefone || null,
        };

        try {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            "https://nrzftrxvlmtdlgyjyypz.supabase.co/rest/v1/abandoned_leads_imoveis",
            false
          );
          xhr.setRequestHeader(
            "apikey",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI"
          );
          xhr.setRequestHeader(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI"
          );
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Prefer", "return=minimal");
          xhr.send(JSON.stringify(payload));

          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(
              "[AbandonedLead] Synchronous XHR successful. Status:",
              xhr.status
            );
          } else {
            console.error(
              "[AbandonedLead] Synchronous XHR error. Status:",
              xhr.status,
              "Response:",
              xhr.responseText
            );
          }
        } catch (error: any) {
          console.error(
            "[AbandonedLead] Synchronous XHR catch block error:",
            error.name,
            error.message,
            error
          );
        }
      } else {
        console.log(
          "[AbandonedLead] Main IF condition NOT MET. No data send attempt."
        );
      }
    };

    window.addEventListener("beforeunload", sendAbandonedLeadData);

    return () => {
      console.log(
        "[AbandonedLead] useEffect cleanup. Removing beforeunload listener. Calling sendAbandonedLeadData for unmount/SPA navigation."
      );
      window.removeEventListener("beforeunload", sendAbandonedLeadData);
      sendAbandonedLeadData();
    };
  }, [getValues]);

  const onFormSubmit = async (data: IFormInput) => {
    setSubmissionError(null);

    if (missingFields.length > 0) {
      setSubmissionError(
        `Por favor, preencha os seguintes campos: ${missingFields.join(", ")}`
      );
      return;
    }

    try {
      console.log("🔄 Salvando dados no Supabase...", data);

      // Save to Supabase first (this is the most important part)
      const { data: insertedData, error: supabaseError } = await supabase
        .from("consulta_imoveis_submissions")
        .insert([
          {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
          },
        ])
        .select();

      if (supabaseError) {
        console.error("❌ Erro do Supabase:", supabaseError);
        throw new Error(`Erro ao salvar dados: ${supabaseError.message}`);
      }

      console.log("✅ Dados salvos com sucesso:", insertedData);

      // Track Facebook Pixel Lead event - OTIMIZAÇÃO DE CONVERSÃO
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Consulta Imóveis - Análise Gratuita",
          content_category: "Administração de Imóveis",
          value: 0,
          currency: "BRL",
        });
        console.log(
          "📊 Facebook Pixel Lead event tracked with conversion optimizations"
        );

        // Verificar se PageView também foi disparado
        console.log(
          "✅ Facebook Pixel configurado corretamente - PageView + Lead events"
        );
      } else {
        console.warn(
          "⚠️ Facebook Pixel não encontrado - verifique se está carregado corretamente"
        );
      }

      // Proceed to thank you page
      const { nome, email, telefone } = data;
      setIsNavigatingToThankYou(true);
      navigate(
        `/obrigado?name=${encodeURIComponent(nome)}&email=${encodeURIComponent(
          email
        )}&phone=${encodeURIComponent(telefone)}`
      );
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmissionError(
        error instanceof Error
          ? `Erro ao salvar dados: ${error.message}`
          : "Erro ao salvar dados. Tente novamente."
      );
    }
  };

  const baseInputStyles =
    "appearance-none block w-full px-4 py-4 sm:px-5 sm:py-5 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-law-gold text-base bg-law-black text-law-white transition-all duration-300 ease-in-out hover:border-law-gold/50";
  const inputBorderStyles = "border-law-blue-dark hover:border-law-gold/70";
  const inputWithIconPadding = "pl-16 sm:pl-18 md:pl-20 lg:pl-20 pr-4";

  return (
    <>
      <Helmet>
        <title>
          Administração de Imóveis com Segurança Jurídica | Seabra & Moura
          Santos Advogados
        </title>
        <meta
          name="description"
          content="Sofrendo com inquilinos inadimplentes ou contratos mal feitos? Conte com advogados especialistas para administrar seu imóvel com segurança jurídica. Análise gratuita!"
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

      <div className="min-h-screen bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-law-white mb-6 leading-tight">
              Sofrendo com inquilinos inadimplentes, contratos mal feitos ou{" "}
              <span className="gold-gradient-text animate-pulse">
                falta de tempo
              </span>{" "}
              para administrar seu imóvel?
            </h1>
            <p className="text-lg sm:text-xl text-law-white-light/95 max-w-3xl mx-auto leading-relaxed">
              Conte com uma equipe de advogados especialistas para administrar
              seu imóvel com
              <span className="text-law-gold font-bold bg-law-gold/10 px-2 py-1 rounded-md shadow-sm">
                {" "}
                segurança jurídica
              </span>{" "}
              e evitar prejuízos.
            </p>
          </div>

          {/* Form Section */}
          <div
            className="max-w-lg mx-auto mb-16"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="bg-law-black-lighter/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-law-blue-dark/30">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-law-gold mb-3">
                  Consultoria Gratuita com Advogados Especialistas em Direito
                  Imobiliário
                </h2>
                <p className="text-law-white-light/90 text-base">
                  Atendimento 100% online e personalizado para sua situação.
                </p>
              </div>

              <Form.Root
                ref={formRef}
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-6"
              >
                {/* Nome */}
                <Form.Field name="nome" className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-law-gold/10 rounded-md flex items-center justify-center">
                      <User className="h-4 w-4 text-law-gold" />
                    </div>
                    <Controller
                      name="nome"
                      control={control}
                      rules={{ required: "Nome é obrigatório" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Seu nome completo"
                          className={`${baseInputStyles} ${inputBorderStyles} ${inputWithIconPadding}`}
                        />
                      )}
                    />
                  </div>
                  {errors.nome && (
                    <Form.Message className="text-red-400 text-sm flex items-center gap-1">
                      <CircleAlert className="h-4 w-4" />
                      {errors.nome.message}
                    </Form.Message>
                  )}
                </Form.Field>

                {/* Email */}
                <Form.Field name="email" className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-law-gold/10 rounded-md flex items-center justify-center">
                      <Mail className="h-4 w-4 text-law-gold" />
                    </div>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          placeholder="seu@email.com"
                          className={`${baseInputStyles} ${inputBorderStyles} ${inputWithIconPadding}`}
                        />
                      )}
                    />
                  </div>
                  {errors.email && (
                    <Form.Message className="text-red-400 text-sm flex items-center gap-1">
                      <CircleAlert className="h-4 w-4" />
                      {errors.email.message}
                    </Form.Message>
                  )}
                </Form.Field>

                {/* WhatsApp */}
                <Form.Field name="telefone" className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-law-gold/10 rounded-md flex items-center justify-center">
                      <Phone className="h-4 w-4 text-law-gold" />
                    </div>
                    <Controller
                      name="telefone"
                      control={control}
                      rules={{ required: "WhatsApp é obrigatório" }}
                      render={({ field }) => (
                        <MyMaskedInput
                          {...field}
                          mask="(99) 99999-9999"
                          placeholder="(11) 99999-9999"
                          className={`${baseInputStyles} ${inputBorderStyles} ${inputWithIconPadding}`}
                        />
                      )}
                    />
                  </div>
                  {errors.telefone && (
                    <Form.Message className="text-red-400 text-sm flex items-center gap-1">
                      <CircleAlert className="h-4 w-4" />
                      {errors.telefone.message}
                    </Form.Message>
                  )}
                </Form.Field>

                {/* Error Message */}
                {submissionError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <CircleAlert className="h-4 w-4" />
                      {submissionError}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Form.Submit asChild>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className="w-full bg-gradient-to-r from-law-gold to-law-gold-light text-law-black font-bold py-4 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-300 hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-law-gold/30 transform hover:-translate-y-1 hover:scale-[1.02] text-lg active:scale-[0.98]"
                  >
                    {isSubmitting
                      ? "Enviando..."
                      : "Quero resolver isso com ajuda jurídica"}
                  </button>
                </Form.Submit>

                {/* Frase de confiança */}
                <div className="text-center mt-3">
                  <p className="text-xs text-law-white-light/70 flex items-center justify-center gap-1">
                    🔒 Seus dados estão protegidos. Atendimento sigiloso
                    conforme o Código de Ética da OAB.
                  </p>
                </div>
              </Form.Root>
            </div>
          </div>

          {/* Trust Elements */}
          <div
            className="max-w-3xl mx-auto mb-16"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center p-6 bg-law-black-lighter/50 rounded-xl border border-law-blue-dark/20 hover:border-law-gold/30 transition-all duration-300 hover:bg-law-black-lighter/70">
                <Award className="h-12 w-12 text-law-gold mb-4" />
                <h3 className="font-bold text-law-white text-lg mb-2">
                  +12 Anos
                </h3>
                <p className="text-law-white-light text-sm">
                  de experiência em Direito Imobiliário
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-law-black-lighter/50 rounded-xl border border-law-blue-dark/20 hover:border-law-gold/30 transition-all duration-300 hover:bg-law-black-lighter/70">
                <Shield className="h-12 w-12 text-law-gold mb-4" />
                <h3 className="font-bold text-law-white text-lg mb-2">OAB</h3>
                <p className="text-law-white-light text-sm">
                  Atendimento feito por advogados registrados na OAB
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-law-black-lighter/50 rounded-xl border border-law-blue-dark/20 hover:border-law-gold/30 transition-all duration-300 hover:bg-law-black-lighter/70">
                <Users className="h-12 w-12 text-law-gold mb-4" />
                <h3 className="font-bold text-law-white text-lg mb-2">+200</h3>
                <p className="text-law-white-light text-sm">
                  imóveis administrados com sucesso
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div
            className="max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-law-white mb-4">
                Como Funciona Nosso Atendimento
              </h2>
              <p className="text-law-white-light text-lg">
                Processo simples e direto para cuidar do seu imóvel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="bg-law-gold/10 p-6 rounded-full mb-6 border border-law-gold/20 w-24 h-24 flex items-center justify-center mx-auto">
                  <MessageCircle className="h-12 w-12 text-law-gold" />
                </div>
                <h3 className="font-bold text-xl text-law-white mb-3">
                  1. Contato Direto
                </h3>
                <p className="text-law-white-light">
                  Entramos em contato via WhatsApp para entender sua situação.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="bg-law-gold/10 p-6 rounded-full mb-6 border border-law-gold/20 w-24 h-24 flex items-center justify-center mx-auto">
                  <SearchCheck className="h-12 w-12 text-law-gold" />
                </div>
                <h3 className="font-bold text-xl text-law-white mb-3">
                  2. Análise Gratuita
                </h3>
                <p className="text-law-white-light">
                  Avaliamos sua situação e identificamos as melhores soluções.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <div className="bg-law-gold/10 p-6 rounded-full mb-6 border border-law-gold/20 w-24 h-24 flex items-center justify-center mx-auto">
                  <Building2 className="h-12 w-12 text-law-gold" />
                </div>
                <h3 className="font-bold text-xl text-law-white mb-3">
                  3. Solução Personalizada
                </h3>
                <p className="text-law-white-light">
                  Implementamos a gestão completa com segurança jurídica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultaImoveis;
