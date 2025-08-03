import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";
import AOS from "aos";
// import 'aos/dist/aos.css'; // Temporarily commented out to check for style conflicts
import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  CircleAlert,
  User,
  Mail,
  Phone,
  FileText,
  SearchCheck,
  Building2,
} from "lucide-react";
import MyMaskedInput from "@/components/MyMaskedInput";
import { useNavigate } from "react-router-dom";
import logoSrc from "@/assets/logo.png"; // Import the logo

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
  tipoImovel: string;
  horarioPreferido: string;
  descricaoProblema: string;
}

const ConsultaImoveis: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    reset,
    getValues,
  } = useForm<IFormInput>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      tipoImovel: "",
      horarioPreferido: "",
      descricaoProblema: "",
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
    if (!currentValues.telefone) missing.push("Telefone");
    if (!currentValues.tipoImovel) missing.push("Tipo de Imóvel");
    if (!currentValues.horarioPreferido) missing.push("Horário Preferido");
    if (!currentValues.descricaoProblema) missing.push("Principal Necessidade");
    setMissingFields(missing);
  }, [
    getValues,
    watch("nome"),
    watch("email"),
    watch("telefone"),
    watch("tipoImovel"),
    watch("horarioPreferido"),
    watch("descricaoProblema"),
  ]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  // Effect to handle abandoned leads
  useEffect(() => {
    // CONSOLE LOG 4: Check if useEffect itself runs and listeners are attached
    console.log(
      "[AbandonedLead] useEffect for abandoned leads RUNNING. Attaching listeners."
    );

    const sendAbandonedLeadData = async () => {
      const formValues = getValues(); // Get current values at the moment of execution
      const isAnyFieldFilled = Object.values(formValues).some(
        (value) => value && typeof value === "string" && value.trim() !== ""
      );

      // CONSOLE LOG 1 & 2: Check if function is entered and basic conditions
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
          tipoimovel: formValues.tipoImovel || null,
          horariopreferido: formValues.horarioPreferido || null,
          descricaoproblema: formValues.descricaoProblema || null,
        };

        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        const url =
          "https://nrzftrxvlmtdlgyjyypz.supabase.co/rest/v1/abandoned_leads_imoveis";
        const headers = {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI",
          Prefer: "return=minimal",
        };

        // Using synchronous XMLHttpRequest as a last resort for page unload
        try {
          const xhr = new XMLHttpRequest();
          // The third parameter `false` makes it synchronous
          xhr.open("POST", url, false);

          // Set Supabase headers
          xhr.setRequestHeader("apikey", headers.apikey);
          xhr.setRequestHeader("Authorization", headers.Authorization);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Prefer", headers.Prefer);

          xhr.send(JSON.stringify(payload));

          // For synchronous XHR, we check status after send() completes
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
          // This catch block might not be very effective for sync XHR errors during unload,
          // but it's here for completeness.
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
      // CONSOLE LOG 5: Check if cleanup function runs
      console.log(
        "[AbandonedLead] useEffect cleanup. Removing beforeunload listener. Calling sendAbandonedLeadData for unmount/SPA navigation."
      );
      window.removeEventListener("beforeunload", sendAbandonedLeadData);
      sendAbandonedLeadData(); // Call on unmount (covers SPA navigation)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues]); // getValues is stable from react-hook-form. Refs are managed by their own effects.

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
            tipo_imovel: data.tipoImovel,
            horario_preferido: data.horarioPreferido,
            descricao_problema: data.descricaoProblema,
          },
        ])
        .select();

      if (supabaseError) {
        console.error("❌ Erro do Supabase:", supabaseError);
        throw new Error(`Erro ao salvar dados: ${supabaseError.message}`);
      }

      console.log("✅ Dados salvos com sucesso:", insertedData);

      // Track Facebook Pixel Lead event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Consulta Imóveis",
          content_category: "Administração de Imóveis",
          value: 0,
          currency: "BRL",
        });
        console.log("📊 Facebook Pixel Lead event tracked");
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
    "appearance-none block w-full px-4 py-3.5 border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-law-gold sm:text-sm bg-law-black text-law-white transition-all duration-300 ease-in-out";
  const inputBorderStyles = "border-law-blue-dark hover:border-law-gold/70";
  const inputWithIconPadding = "pl-12";

  return (
    <>
      <Helmet>
        <title>
          Aumente sua Renda em 30% ou Mais | Gestão Profissional de Imóveis |
          Seabra & Moura Santos
        </title>
        <meta
          name="description"
          content="CONSULTA GRATUITA: Descubra como eliminar inadimplência e aumentar sua renda em 30% ou mais com gestão profissional. Garantia de resultados em 90 dias!"
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
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-law-white">
              Aumente sua Renda em{" "}
              <span className="gold-gradient-text block text-5xl sm:text-6xl md:text-7xl">
                30% ou Mais
              </span>{" "}
              com a nossa Gestão Profissional de Imóveis.
            </h1>
          </div>

          <Form.Root
            ref={formRef}
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-6 bg-law-black-lighter/80 backdrop-blur-sm p-8 sm:p-10 rounded-xl shadow-2xl border border-law-blue-dark/30"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-law-gold tracking-wide">
                Solicite sua Consultoria Gratuita
              </h2>
              <p className="text-law-white-light/90 mt-1">
                Preencha seus dados e nossos advogados entrarão em contato por
                telefone no horário e dia de sua preferência. Não há reunião
                marcada, apenas um contato direto para esclarecer suas dúvidas.
              </p>
            </div>
            {/* Nome */}
            <Form.Field name="nome" className="space-y-1.5">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-law-gold/70" />
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
            <Form.Field name="email" className="space-y-1.5">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-law-gold/70" />
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

            {/* Telefone */}
            <Form.Field name="telefone" className="space-y-1.5">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-law-gold/70" />
                <Controller
                  name="telefone"
                  control={control}
                  rules={{ required: "Telefone é obrigatório" }}
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

            {/* Tipo de Imóvel */}
            <Form.Field name="tipoImovel" className="space-y-1.5">
              <Form.Label className="text-sm font-medium text-law-white">
                Tipo de Imóvel
              </Form.Label>
              <Controller
                name="tipoImovel"
                control={control}
                rules={{ required: "Selecione o tipo de imóvel" }}
                render={({ field }) => (
                  <Select.Root
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <Select.Trigger
                      className={`${baseInputStyles} ${inputBorderStyles} flex items-center justify-between`}
                    >
                      <Select.Value placeholder="Selecione o tipo de imóvel" />
                      <Select.Icon>
                        <ChevronDownIcon className="h-4 w-4" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-law-black border border-law-blue-dark rounded-md shadow-lg z-50">
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 text-law-gold">
                          <ChevronUpIcon className="h-4 w-4" />
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-1">
                          <Select.Item
                            value="apartamento"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>Apartamento</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="casa"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>Casa</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="comercial"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>Comercial</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="terreno"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>Terreno</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center h-6 text-law-gold">
                          <ChevronDownIcon className="h-4 w-4" />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />
              {errors.tipoImovel && (
                <Form.Message className="text-red-400 text-sm flex items-center gap-1">
                  <CircleAlert className="h-4 w-4" />
                  {errors.tipoImovel.message}
                </Form.Message>
              )}
            </Form.Field>

            {/* Principal Necessidade - Radio Buttons */}
            <Form.Field name="descricaoProblema" className="space-y-1.5">
              <Form.Label className="text-sm font-medium text-law-white">
                Qual é sua principal necessidade?
              </Form.Label>
              <Controller
                name="descricaoProblema"
                control={control}
                rules={{ required: "Selecione sua principal necessidade" }}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="space-y-3"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="administracao-completa"
                        id="administracao-completa"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="administracao-completa"
                      >
                        Administração completa do imóvel
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="inquilino-inadimplente"
                        id="inquilino-inadimplente"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="inquilino-inadimplente"
                      >
                        Inquilino inadimplente
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="contrato-locacao"
                        id="contrato-locacao"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="contrato-locacao"
                      >
                        Elaboração de contrato de locação
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="despejo"
                        id="despejo"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="despejo"
                      >
                        Ação de despejo
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="questoes-condominiais"
                        id="questoes-condominiais"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="questoes-condominiais"
                      >
                        Questões condominiais
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="cobranca-alugueis"
                        id="cobranca-alugueis"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="cobranca-alugueis"
                      >
                        Cobrança de aluguéis em atraso
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="consultoria-preventiva"
                        id="consultoria-preventiva"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="consultoria-preventiva"
                      >
                        Consultoria jurídica preventiva
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-md border border-law-blue-dark/50 hover:border-law-gold/50 hover:bg-law-gold/5 transition-all duration-200">
                      <RadioGroup.Item
                        className="w-4 h-4 rounded-full border border-law-gold bg-law-black"
                        value="outros"
                        id="outros"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-law-gold" />
                      </RadioGroup.Item>
                      <label
                        className="text-sm text-law-white cursor-pointer flex-1"
                        htmlFor="outros"
                      >
                        Outros
                      </label>
                    </div>
                  </RadioGroup.Root>
                )}
              />
              {errors.descricaoProblema && (
                <Form.Message className="text-red-400 text-sm flex items-center gap-1">
                  <CircleAlert className="h-4 w-4" />
                  {errors.descricaoProblema.message}
                </Form.Message>
              )}
            </Form.Field>

            {/* Horário Preferido */}
            <Form.Field name="horarioPreferido" className="space-y-1.5">
              <Form.Label className="text-sm font-medium text-law-white">
                Horário e Dia Preferido para Contato
              </Form.Label>
              <Controller
                name="horarioPreferido"
                control={control}
                rules={{ required: "Selecione um horário preferido" }}
                render={({ field }) => (
                  <Select.Root
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <Select.Trigger
                      className={`${baseInputStyles} ${inputBorderStyles} flex items-center justify-between`}
                    >
                      <Select.Value placeholder="Selecione o melhor horário e dia para contato" />
                      <Select.Icon>
                        <ChevronDownIcon className="h-4 w-4" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-law-black border border-law-blue-dark rounded-md shadow-lg z-50">
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 text-law-gold">
                          <ChevronUpIcon className="h-4 w-4" />
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-1">
                          <Select.Item
                            value="manha-semana"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>
                              Manhã (9h-12h) - Dias úteis
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="tarde-semana"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>
                              Tarde (14h-17h) - Dias úteis
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="noite-semana"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>
                              Noite (18h-20h) - Dias úteis
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="sabado-manha"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>
                              Sábado pela manhã (9h-12h)
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="qualquer-horario"
                            className="relative flex items-center px-3 py-2 text-law-white hover:bg-law-gold/10 rounded cursor-pointer"
                          >
                            <Select.ItemText>
                              Qualquer horário comercial
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center h-6 text-law-gold">
                          <ChevronDownIcon className="h-4 w-4" />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />
              {errors.horarioPreferido && (
                <Form.Message className="text-red-400 text-sm flex items-center gap-1">
                  <CircleAlert className="h-4 w-4" />
                  {errors.horarioPreferido.message}
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
                className="w-full bg-gradient-to-r from-law-gold to-law-gold-light text-law-black font-bold py-4 px-6 rounded-md hover:from-law-gold-light hover:to-law-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSubmitting
                  ? "Enviando..."
                  : "Solicitar Contato dos Advogados"}
              </button>
            </Form.Submit>
          </Form.Root>

          {/* Steps Section - Moved after form */}
          <div
            className="my-10 sm:my-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-law-white mb-2">
                Como Funciona Nosso Atendimento
              </h2>
              <p className="text-law-white-light/90">
                Processo simples e direto para cuidar do seu imóvel
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div
                className="flex flex-col items-center p-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="bg-law-gold/10 p-4 rounded-full mb-4 border border-law-gold/20">
                  <FileText className="h-8 w-8 text-law-gold" />
                </div>
                <h3 className="font-bold text-lg text-law-white">
                  1. Contato Direto
                </h3>
                <p className="text-sm text-law-white-light/80 mt-1">
                  Entramos em contato por telefone no horário de sua preferência
                  para uma conversa inicial sobre sua situação imobiliária.
                </p>
              </div>
              <div
                className="flex flex-col items-center p-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="bg-law-gold/10 p-4 rounded-full mb-4 border border-law-gold/20">
                  <SearchCheck className="h-8 w-8 text-law-gold" />
                </div>
                <h3 className="font-bold text-lg text-law-white">
                  2. Análise Gratuita
                </h3>
                <p className="text-sm text-law-white-light/80 mt-1">
                  Durante o contato, avaliamos sua situação e identificamos as
                  melhores estratégias de gestão e proteção jurídica.
                </p>
              </div>
              <div
                className="flex flex-col items-center p-4"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="bg-law-gold/10 p-4 rounded-full mb-4 border border-law-gold/20">
                  <Building2 className="h-8 w-8 text-law-gold" />
                </div>
                <h3 className="font-bold text-lg text-law-white">
                  3. Solução Personalizada
                </h3>
                <p className="text-sm text-law-white-light/80 mt-1">
                  Oferecemos gestão completa, assessoria jurídica preventiva e
                  representação conforme suas necessidades específicas.
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
