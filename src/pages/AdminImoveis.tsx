import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";
import { ConsultaImoveisSubmission } from "@/lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  User,
  Mail,
  Phone,
  Building2,
  Clock,
  FileText,
  RefreshCw,
  Download,
  Search,
  Archive,
  Trash2,
  AlertTriangle,
  MessageCircle,
  Send,
} from "lucide-react";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

const AdminImoveis: React.FC = () => {
  const [submissions, setSubmissions] = useState<ConsultaImoveisSubmission[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubmissions, setFilteredSubmissions] = useState<
    ConsultaImoveisSubmission[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showArchiveModal, setShowArchiveModal] = useState<number | null>(null);
  const [sendingWhatsApp, setSendingWhatsApp] = useState<number | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      // Primeiro tenta com a coluna arquivado, se falhar, busca todos
      let query = supabase
        .from("consulta_imoveis_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      // Tenta adicionar filtro de arquivado se a coluna existir
      try {
        const { data, error } = await query.eq("arquivado", false);

        if (
          error &&
          error.message.includes('column "arquivado" does not exist')
        ) {
          // Se a coluna não existe, busca todos os registros
          const { data: allData, error: allError } = await supabase
            .from("consulta_imoveis_submissions")
            .select("*")
            .order("created_at", { ascending: false });

          if (allError) throw allError;
          setSubmissions(allData || []);
          setFilteredSubmissions(allData || []);
        } else {
          if (error) throw error;
          setSubmissions(data || []);
          setFilteredSubmissions(data || []);
        }
      } catch (queryError) {
        // Fallback: busca todos os registros
        const { data: allData, error: allError } = await supabase
          .from("consulta_imoveis_submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (allError) throw allError;
        setSubmissions(allData || []);
        setFilteredSubmissions(allData || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("🗑️ Tentando excluir registro ID:", id, "Tipo:", typeof id);

      // Primeiro, vamos verificar se o registro existe
      const { data: existingRecord, error: checkError } = await supabase
        .from("consulta_imoveis_submissions")
        .select("id, nome")
        .eq("id", id)
        .single();

      console.log("🔍 Verificação do registro:", {
        existingRecord,
        checkError,
      });

      if (checkError && checkError.code !== "PGRST116") {
        // PGRST116 = not found
        throw checkError;
      }

      if (!existingRecord) {
        throw new Error(`Registro com ID ${id} não encontrado.`);
      }

      // Agora tenta excluir
      const { data, error } = await supabase
        .from("consulta_imoveis_submissions")
        .delete()
        .eq("id", id)
        .select();

      console.log("🗑️ Resultado da exclusão:", { data, error });

      if (error) {
        console.error("❌ Erro na exclusão:", error);

        // Verificar se é um problema de RLS
        if (
          error.message.includes("RLS") ||
          error.message.includes("policy") ||
          error.code === "42501"
        ) {
          throw new Error(
            `Erro de permissão RLS: ${error.message}. Execute as políticas SQL ou desabilite RLS temporariamente.`
          );
        }

        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error(
          "Nenhum registro foi excluído. Possível problema de permissões RLS."
        );
      }

      console.log("✅ Registro excluído com sucesso:", data);

      // Remove from local state
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setShowDeleteModal(null);

      // Limpa qualquer erro anterior
      setError(null);
    } catch (err) {
      console.error("❌ Erro completo:", err);
      setError(err instanceof Error ? err.message : "Erro ao excluir registro");
    }
  };

  const handleSendWhatsApp = async (submission: ConsultaImoveisSubmission) => {
    if (!submission.id) return;

    try {
      setSendingWhatsApp(submission.id);
      setError(null);

      console.log(
        "📱 Enviando WhatsApp para:",
        submission.nome,
        submission.telefone
      );

      const result = await sendWhatsAppMessage({
        nome: submission.nome,
        telefone: submission.telefone,
        horario_preferido: submission.horario_preferido,
      });

      if (result.success) {
        console.log(`✅ WhatsApp enviado via ${result.provider}`);

        // Opcional: Marcar no banco que a mensagem foi enviada
        try {
          await supabase
            .from("consulta_imoveis_submissions")
            .update({
              whatsapp_enviado: true,
              whatsapp_enviado_em: new Date().toISOString(),
              whatsapp_provider: result.provider,
            })
            .eq("id", submission.id);
        } catch (updateError) {
          console.warn(
            "⚠️ Não foi possível atualizar status no banco:",
            updateError
          );
        }

        // Mostrar sucesso temporariamente
        setError(
          `✅ WhatsApp enviado com sucesso para ${submission.nome} via ${result.provider}!`
        );
        setTimeout(() => setError(null), 5000);
      } else {
        throw new Error(result.error || "Falha ao enviar WhatsApp");
      }
    } catch (err) {
      console.error("❌ Erro ao enviar WhatsApp:", err);
      setError(err instanceof Error ? err.message : "Erro ao enviar WhatsApp");
    } finally {
      setSendingWhatsApp(null);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      const { error } = await supabase
        .from("consulta_imoveis_submissions")
        .update({
          arquivado: true,
          arquivado_em: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        if (error.message.includes('column "arquivado" does not exist')) {
          setError(
            "Para usar o arquivamento, execute o SQL de atualização da tabela primeiro."
          );
          setShowArchiveModal(null);
          return;
        }
        throw error;
      }

      // Remove from local state
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setShowArchiveModal(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao arquivar registro"
      );
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(
        (submission) =>
          submission.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.telefone.includes(searchTerm) ||
          submission.descricao_problema
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  }, [searchTerm, submissions]);

  const exportToCSV = () => {
    const headers = [
      "Data/Hora",
      "Nome",
      "Email",
      "Telefone",
      "Tipo de Imóvel",
      "Situação do Imóvel",
      "Horário Preferido",
      "Descrição do Problema",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredSubmissions.map((submission) =>
        [
          submission.created_at
            ? format(new Date(submission.created_at), "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })
            : "",
          `"${submission.nome}"`,
          `"${submission.email}"`,
          `"${submission.telefone}"`,
          `"${submission.tipo_imovel}"`,
          `"${submission.situacao_imovel}"`,
          `"${submission.horario_preferido}"`,
          `"${submission.descricao_problema.replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `consultas-imoveis-${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (situacao: string) => {
    switch (situacao) {
      case "alugado":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "vazio":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "problemas":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getSituacaoText = (situacao: string) => {
    switch (situacao) {
      case "alugado":
        return "Já está alugado";
      case "vazio":
        return "Está vazio/disponível";
      case "problemas":
        return "Tenho problemas com inquilino";
      default:
        return situacao;
    }
  };

  const getTipoImovelText = (tipo: string) => {
    switch (tipo) {
      case "apartamento":
        return "Apartamento";
      case "casa":
        return "Casa";
      case "comercial":
        return "Comercial";
      case "terreno":
        return "Terreno";
      default:
        return tipo;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-law-gold" />
          <span className="text-lg">Carregando dados...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Admin - Consultas de Imóveis | Seabra & Moura Santos Advogados
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-law-gold mb-2">
              Consultas de Imóveis - Painel Administrativo
            </h1>
            <p className="text-law-white-light">
              Gerencie e visualize todas as solicitações de consultoria
              imobiliária
            </p>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-law-gold/70" />
              <input
                type="text"
                placeholder="Buscar por nome, email, telefone ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-law-black-lighter border border-law-blue-dark rounded-md text-law-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-law-gold"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchSubmissions}
                className="flex items-center gap-2 px-4 py-2 bg-law-blue-dark hover:bg-law-blue text-law-white rounded-md transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </button>

              <a
                href="/admin/imoveis/arquivados"
                className="flex items-center gap-2 px-4 py-2 bg-law-blue-dark hover:bg-law-blue text-law-white rounded-md transition-colors"
                title="Execute o SQL de atualização primeiro se não funcionar"
              >
                <Archive className="h-4 w-4" />
                Ver Arquivados
              </a>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-law-gold hover:bg-law-gold-light text-law-black font-medium rounded-md transition-colors"
              >
                <Download className="h-4 w-4" />
                Exportar CSV
              </button>

              {/* Botão de teste do sistema WhatsApp */}
              <button
                onClick={async () => {
                  console.log("🧪 Testando sistema WhatsApp...");
                  try {
                    const testData = {
                      nome: "Teste Sistema",
                      telefone: "21999999999",
                      horario_preferido: "14:00-16:00",
                    };

                    const result = await sendWhatsAppMessage(testData);

                    if (result.success) {
                      setError(
                        `✅ Sistema funcionando! Provider: ${result.provider}`
                      );
                    } else {
                      setError(`❌ Erro no sistema: ${result.error}`);
                    }
                  } catch (err) {
                    console.error("❌ Erro no teste:", err);
                    setError(
                      `❌ Erro no teste: ${
                        err instanceof Error ? err.message : "Erro desconhecido"
                      }`
                    );
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                🧪 Testar WhatsApp
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-law-black-lighter/80 backdrop-blur-sm p-6 rounded-xl border border-law-blue-dark/30">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-law-gold" />
                <div>
                  <p className="text-2xl font-bold text-law-white">
                    {submissions.length}
                  </p>
                  <p className="text-law-white-light text-sm">
                    Total de Consultas
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-law-black-lighter/80 backdrop-blur-sm p-6 rounded-xl border border-law-blue-dark/30">
              <div className="flex items-center gap-3">
                <Search className="h-8 w-8 text-law-gold" />
                <div>
                  <p className="text-2xl font-bold text-law-white">
                    {filteredSubmissions.length}
                  </p>
                  <p className="text-law-white-light text-sm">
                    Resultados Filtrados
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-law-black-lighter/80 backdrop-blur-sm p-6 rounded-xl border border-law-blue-dark/30">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-law-gold" />
                <div>
                  <p className="text-2xl font-bold text-law-white">
                    {
                      submissions.filter(
                        (s) =>
                          s.created_at &&
                          new Date(s.created_at) >
                            new Date(Date.now() - 24 * 60 * 60 * 1000)
                      ).length
                    }
                  </p>
                  <p className="text-law-white-light text-sm">Últimas 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-md p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-law-gold/50 mx-auto mb-4" />
                <p className="text-law-white-light text-lg">
                  {searchTerm
                    ? "Nenhuma consulta encontrada com os critérios de busca."
                    : "Nenhuma consulta encontrada."}
                </p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-law-black-lighter/80 backdrop-blur-sm p-6 rounded-xl border border-law-blue-dark/30 hover:border-law-gold/30 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-law-gold flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {submission.nome}
                        </h3>
                        <div className="flex items-center gap-3">
                          {submission.created_at && (
                            <span className="text-sm text-law-white-light">
                              {format(
                                new Date(submission.created_at),
                                "dd/MM/yyyy HH:mm",
                                { locale: ptBR }
                              )}
                            </span>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSendWhatsApp(submission)}
                              disabled={sendingWhatsApp === submission.id}
                              className="p-2 text-green-400/70 hover:text-green-400 hover:bg-green-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Enviar WhatsApp"
                            >
                              {sendingWhatsApp === submission.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <MessageCircle className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                setShowArchiveModal(submission.id!)
                              }
                              className="p-2 text-law-gold/70 hover:text-law-gold hover:bg-law-gold/10 rounded-md transition-colors"
                              title="Arquivar"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(submission.id!)}
                              className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-law-white-light">
                          <Mail className="h-4 w-4 text-law-gold/70" />
                          <span>{submission.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-law-white-light">
                          <Phone className="h-4 w-4 text-law-gold/70" />
                          <span>{submission.telefone}</span>
                        </div>

                        <div className="flex items-center gap-2 text-law-white-light">
                          <Building2 className="h-4 w-4 text-law-gold/70" />
                          <span>
                            {getTipoImovelText(submission.tipo_imovel)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-law-white-light">
                          <Clock className="h-4 w-4 text-law-gold/70" />
                          <span>
                            Contato preferido: {submission.horario_preferido}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-law-white-light">
                          Status:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            submission.situacao_imovel
                          )}`}
                        >
                          {getSituacaoText(submission.situacao_imovel)}
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-law-gold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Descrição do Problema
                        </h4>
                        <div className="bg-law-black/50 p-4 rounded-md border border-law-blue-dark/20">
                          <p className="text-law-white-light text-sm leading-relaxed">
                            {submission.descricao_problema}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-law-black-lighter border border-law-blue-dark rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <h3 className="text-lg font-semibold text-law-white">
                  Confirmar Exclusão
                </h3>
              </div>
              <p className="text-law-white-light mb-6">
                Tem certeza que deseja excluir este registro? Esta ação não pode
                ser desfeita.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-law-white-light hover:text-law-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Archive Modal */}
        {showArchiveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-law-black-lighter border border-law-blue-dark rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <Archive className="h-6 w-6 text-law-gold" />
                <h3 className="text-lg font-semibold text-law-white">
                  Confirmar Arquivamento
                </h3>
              </div>
              <p className="text-law-white-light mb-6">
                Tem certeza que deseja arquivar este registro? Ele será movido
                para a seção de arquivados.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowArchiveModal(null)}
                  className="px-4 py-2 text-law-white-light hover:text-law-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleArchive(showArchiveModal)}
                  className="px-4 py-2 bg-law-gold hover:bg-law-gold-light text-law-black font-medium rounded-md transition-colors"
                >
                  Arquivar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminImoveis;
