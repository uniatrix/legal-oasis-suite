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
  RotateCcw,
  Trash2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

const AdminImoveisArquivados: React.FC = () => {
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
  const [showRestoreModal, setShowRestoreModal] = useState<number | null>(null);

  const fetchArchivedSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("consulta_imoveis_submissions")
        .select("*")
        .eq("arquivado", true)
        .order("arquivado_em", { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("consulta_imoveis_submissions")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setShowDeleteModal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir registro");
    }
  };

  const handleRestore = async (id: number) => {
    try {
      const { error } = await supabase
        .from("consulta_imoveis_submissions")
        .update({
          arquivado: false,
          arquivado_em: null,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setShowRestoreModal(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao restaurar registro"
      );
    }
  };

  useEffect(() => {
    fetchArchivedSubmissions();
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
      "Data/Hora Criação",
      "Data/Hora Arquivamento",
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
          submission.arquivado_em
            ? format(new Date(submission.arquivado_em), "dd/MM/yyyy HH:mm", {
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
      `consultas-imoveis-arquivados-${format(new Date(), "yyyy-MM-dd")}.csv`
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
          Admin - Consultas Arquivadas | Seabra & Moura Santos Advogados
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <a
                href="/admin/imoveis"
                className="flex items-center gap-2 text-law-gold hover:text-law-gold-light transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Voltar
              </a>
            </div>
            <h1 className="text-3xl font-bold text-law-gold mb-2">
              Consultas Arquivadas - Painel Administrativo
            </h1>
            <p className="text-law-white-light">
              Gerencie consultas arquivadas - restaure ou exclua permanentemente
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
                onClick={fetchArchivedSubmissions}
                className="flex items-center gap-2 px-4 py-2 bg-law-blue-dark hover:bg-law-blue text-law-white rounded-md transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-law-gold hover:bg-law-gold-light text-law-black font-medium rounded-md transition-colors"
              >
                <Download className="h-4 w-4" />
                Exportar CSV
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-law-black-lighter/80 backdrop-blur-sm p-6 rounded-xl border border-law-blue-dark/30">
              <div className="flex items-center gap-3">
                <Archive className="h-8 w-8 text-law-gold" />
                <div>
                  <p className="text-2xl font-bold text-law-white">
                    {submissions.length}
                  </p>
                  <p className="text-law-white-light text-sm">
                    Total Arquivados
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
                <Archive className="h-12 w-12 text-law-gold/50 mx-auto mb-4" />
                <p className="text-law-white-light text-lg">
                  {searchTerm
                    ? "Nenhuma consulta arquivada encontrada com os critérios de busca."
                    : "Nenhuma consulta arquivada encontrada."}
                </p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-law-black-lighter/80 backdrop-blur-sm p-6 rounded-xl border border-law-blue-dark/30 hover:border-law-gold/30 transition-colors opacity-75"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-law-gold flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {submission.nome}
                          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">
                            ARQUIVADO
                          </span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            {submission.created_at && (
                              <div className="text-sm text-law-white-light">
                                Criado:{" "}
                                {format(
                                  new Date(submission.created_at),
                                  "dd/MM/yyyy HH:mm",
                                  { locale: ptBR }
                                )}
                              </div>
                            )}
                            {submission.arquivado_em && (
                              <div className="text-xs text-gray-400">
                                Arquivado:{" "}
                                {format(
                                  new Date(submission.arquivado_em),
                                  "dd/MM/yyyy HH:mm",
                                  { locale: ptBR }
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setShowRestoreModal(submission.id!)
                              }
                              className="p-2 text-law-gold/70 hover:text-law-gold hover:bg-law-gold/10 rounded-md transition-colors"
                              title="Restaurar"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(submission.id!)}
                              className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                              title="Excluir Permanentemente"
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

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-law-black-lighter border border-law-blue-dark rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-law-white">
                    Confirmar Exclusão Permanente
                  </h3>
                </div>
                <p className="text-law-white-light mb-6">
                  Tem certeza que deseja excluir permanentemente este registro?
                  Esta ação não pode ser desfeita.
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
                    Excluir Permanentemente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Restore Modal */}
          {showRestoreModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-law-black-lighter border border-law-blue-dark rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <RotateCcw className="h-6 w-6 text-law-gold" />
                  <h3 className="text-lg font-semibold text-law-white">
                    Confirmar Restauração
                  </h3>
                </div>
                <p className="text-law-white-light mb-6">
                  Tem certeza que deseja restaurar este registro? Ele voltará
                  para a lista principal.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowRestoreModal(null)}
                    className="px-4 py-2 text-law-white-light hover:text-law-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleRestore(showRestoreModal)}
                    className="px-4 py-2 bg-law-gold hover:bg-law-gold-light text-law-black font-medium rounded-md transition-colors"
                  >
                    Restaurar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminImoveisArquivados;
