import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ConsultaINSS from "./pages/ConsultaINSS";
import ConsultaImoveis from "./pages/ConsultaImoveis";
import AdminImoveis from "./pages/AdminImoveis";
import AdminImoveisArquivados from "./pages/AdminImoveisArquivados";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import Obrigado from "./pages/Obrigado";

const queryClient = new QueryClient();

// Extracted Routes into its own component to use useLocation
const AppRoutes = () => {
  const location = useLocation();
  const showChatbot = location.pathname !== "/consulta-inss";

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/consulta-inss" element={<ConsultaINSS />} />
        <Route path="/consulta-imoveis" element={<ConsultaImoveis />} />
        <Route path="/admin/imoveis" element={<AdminImoveis />} />
        <Route
          path="/admin/imoveis/arquivados"
          element={<AdminImoveisArquivados />}
        />
        <Route path="/obrigado" element={<Obrigado />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showChatbot && <Chatbot />}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
