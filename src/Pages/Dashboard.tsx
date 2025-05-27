import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { VscAdd } from "react-icons/vsc";
import { MdOutlineClose } from "react-icons/md";
import ReusableDialog from "../components/ReusableDialog";
import { Card } from "../components/Card";
import { buscarResultados } from "../Utils/Auth";
import { extrairPrimeiroNome } from "../Utils/ExtName";
import { iconesPorCultura } from "../lib/culturasData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { normalizeText } from "@/Utils/normalizeText";
import { useUserStore } from "@/store/userStore";



const DashBoard = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [res, setRes] = useState<any[]>([]);
  const [pagina, setPagina] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { user } = useUserStore();


  const [filtros, setFiltros] = useState({
    cultura: "",
    resultado: "",
    classe: "",
    principio: "",
    pais: "",
    dosagemMin: "",
    dosagemMax: "",
  });

  const [filtrosTemporarios, setFiltrosTemporarios] = useState({ ...filtros });

  const culturasDisponiveis = Array.from(
    new Set(res.map((item) => extrairPrimeiroNome(item.cultura)))
  ).filter(Boolean);

  const classesDisponiveis = Array.from(
    new Set(
      res.flatMap((item) =>
        item.substancias.map((sub: any) => sub.classe?.descricao)
      )
    )
  ).filter(Boolean);

  const principiosDisponiveis = Array.from(
    new Set(
      res.flatMap((item) =>
        item.substancias.map((sub: any) => sub.principio_ativo)
      )
    )
  ).filter(Boolean);

  const paisesDisponiveis = Array.from(
    new Set(res.map((item) => item.referencia?.pais))
  ).filter(Boolean);

  const itensPorPagina = 5;

  const resFiltrados = res
    .filter((item) => {
      const cultura = normalizeText(item.cultura || "");
      const resultado = normalizeText(item.resultado || "");
      const pais = normalizeText(item.referencia?.pais || "");
      const passaHistorico =
        searchHistory.length === 0
          ? true
          : searchHistory.some((term) =>
            cultura.includes(normalizeText(term))
          );

      const passaFiltroCultura = filtros.cultura
        ? cultura.includes(normalizeText(filtros.cultura))
        : true;

      const passaFiltroResultado = filtros.resultado
        ? resultado === normalizeText(filtros.resultado)
        : true;

      const passaFiltroPais = filtros.pais
        ? pais.includes(normalizeText(filtros.pais))
        : true;

      const passaFiltroClasse = filtros.classe
        ? item.substancias.some((s: any) =>
          normalizeText(s.classe?.descricao).includes(normalizeText(filtros.classe))
        )
        : true;

      const passaFiltroPrincipio = filtros.principio
        ? item.substancias.some((s: any) =>
          normalizeText(s.principio_ativo).includes(normalizeText(filtros.principio))
        )
        : true;

      const passaFiltroDosagem = item.substancias.some((s: any) => {
        const dosagem = s.dosagem_substancia;
        const min = filtros.dosagemMin ? parseFloat(filtros.dosagemMin) : null;
        const max = filtros.dosagemMax ? parseFloat(filtros.dosagemMax) : null;
        return (
          (min === null || dosagem >= min) &&
          (max === null || dosagem <= max)
        );
      });

      return (
        passaFiltroCultura &&
        passaFiltroResultado &&
        passaHistorico &&
        passaFiltroClasse &&
        passaFiltroPrincipio &&
        passaFiltroPais &&
        passaFiltroDosagem
      );
    })
    .sort((a, b) => {
      // Ordena pelo campo 'cultura' (alfabeticamente)
      const culturaA = normalizeText(a.cultura || "");
      const culturaB = normalizeText(b.cultura || "");
      return culturaA.localeCompare(culturaB);
    });
  console.log("Resultados filtrados:", resFiltrados);

  const totalPaginas = Math.ceil(resFiltrados.length / itensPorPagina);
  const resPaginados = resFiltrados.slice(
    pagina * itensPorPagina,
    (pagina + 1) * itensPorPagina
  );

  const culturaContagem = resFiltrados.reduce<Record<string, number>>(
    (acc, item) => {
      const cultura = normalizeText(extrairPrimeiroNome(item.cultura || "nd"));
      acc[cultura] = (acc[cultura] || 0) + 1;
      return acc;
    },
    {}
  );

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchHistory((prev) => [...prev, searchTerm]);
      setSearchTerm("");
    }
  };

  const handleRemove = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFilter = () => {
    if (!navigator.onLine) {
      localStorage.setItem("filtrosPendentes", JSON.stringify(filtrosTemporarios));
      toast.warning("Você está offline. Filtros serão aplicados assim que a conexão voltar.");
      return;
    }

    setFiltros(filtrosTemporarios);
    setPagina(0);
    toast.success("Filtros aplicados com sucesso!");
  };

  const handleClearFilters = () => {
    setFiltrosTemporarios({
      cultura: "",
      resultado: "",
      classe: "",
      principio: "",
      pais: "",
      dosagemMin: "",
      dosagemMax: "",
    });
    setFiltros({
      cultura: "",
      resultado: "",
      classe: "",
      principio: "",
      pais: "",
      dosagemMin: "",
      dosagemMax: "",
    });
    setPagina(0);
    toast.info("Todos os filtros foram limpos.");
  };

  useEffect(() => {
    const autenticarEBuscar = async () => {
      try {
        setIsLoading(true);
        const resultadosData = await buscarResultados(String(user?.id || ""));
        if (Array.isArray(resultadosData)) {
          const somenteValidos = resultadosData.filter(
            (item) => item.resultado && item.cultura
          );
          console.log("Resultados válidos:", somenteValidos);
          setRes(somenteValidos);
        }
      } catch (err) {
        console.error("Erro ao buscar resultados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleOnline = () => {
      const filtrosSalvos = localStorage.getItem("filtrosPendentes");

      if (filtrosSalvos) {
        const filtrosRecuperados = JSON.parse(filtrosSalvos);

        toast.info(
          ({ closeToast }: { closeToast?: () => void }) => (
            <div className="flex flex-col">
              <span>🔌 Conexão restabelecida. Aplicar os filtros salvos?</span>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setFiltros(filtrosRecuperados);
                    setFiltrosTemporarios(filtrosRecuperados);
                    setPagina(0);
                    localStorage.removeItem("filtrosPendentes");
                    toast.success("Filtros aplicados automaticamente!");
                    closeToast?.();
                  }}
                >
                  Sim
                </button>
                <button
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                  onClick={() => {
                    localStorage.removeItem("filtrosPendentes");
                    closeToast?.();
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          ),
          {
            autoClose: false,
            closeOnClick: false,
          }
        );
      } else {
        toast.info(
          ({ closeToast }: { closeToast?: () => void }) => (
            <div className="flex flex-col">
              <span>🔌 Conexão restabelecida. Deseja voltar para a tela inicial?</span>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    navigate("/");
                    closeToast?.();
                  }}
                >
                  Sim
                </button>
                <button
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                  onClick={closeToast}
                >
                  Não
                </button>
              </div>
            </div>
          ),
          {
            autoClose: false,
            closeOnClick: false,
          }
        );
      }
    };

    const handleOffline = () => {
      toast.error("Você está offline");
    };


    autenticarEBuscar();


    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);


    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate, user?.id]);


  return (
    <div className="w-full h-screen overflow-auto flex flex-col px-4 pb-20">
      <h1 className="font-aceh text-3xl font-semibold mt-4 mb-3">Produtos</h1>

      {/* Ícones com contador */}
      <div className="flex gap-3 flex-wrap mb-4 justify-center">
        {Object.entries(culturaContagem).map(([cultura, count], index) => (
          <div
            key={index}
            className="relative flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-md"
            title={cultura}
          >
            <img
              src={iconesPorCultura[cultura] || iconesPorCultura["nd"]}
              width={30}
              height={30}
              alt={cultura}
            />
            <div className="absolute top-0 right-0 bg-green-400 rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {count}
            </div>
          </div>
        ))}
      </div>

      {/* Barra de pesquisa */}
      <div className="flex justify-between gap-3">
        <div className="relative flex items-center w-full md:w-3/4 lg:w-2/4 mb-4 gap-4">
          <Search size={17} className="absolute ml-3" color="gray" />
          <input
            type="text"
            className="w-full h-10 pl-10 pr-10 rounded-xl border border-gray-300"
            placeholder="Pesquisar Produto ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <VscAdd
            size={24}
            className="absolute right-3 cursor-pointer"
            color="#379276"
            onClick={handleSearch}
          />
        </div>

        <ReusableDialog title="Filtros Avançados" onConfirm={handleFilter}>
          <>
            {/* Filtros dentro da modal */}
            <div className="flex flex-col gap-3">
              <select
                className="border p-2 rounded"
                value={filtrosTemporarios.cultura}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, cultura: e.target.value })
                }
              >
                <option value="">Todas as culturas</option>
                {culturasDisponiveis
                  .sort((a, b) => a.localeCompare(b)) // Ordenando as culturas
                  .map((cultura, idx) => (
                    <option key={idx} value={cultura}>
                      {cultura}
                    </option>
                  ))}
              </select>


              <select
                className="border p-2 rounded"
                value={filtrosTemporarios.resultado}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, resultado: e.target.value })
                }
              >
                <option value="">Todos os resultados</option>
                <option value="positivo">Positivo</option>
                <option value="negativo">Negativo</option>
              </select>

              <select
                className="border p-2 rounded"
                value={filtrosTemporarios.classe}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, classe: e.target.value })
                }
              >
                <option value="">Todas as classes</option>
                {classesDisponiveis.map((classe, idx) => (
                  <option key={idx} value={classe}>
                    {classe}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded"
                value={filtrosTemporarios.principio}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, principio: e.target.value })
                }
              >
                <option value="">Todos os princípios</option>
                {principiosDisponiveis.map((principio, idx) => (
                  <option key={idx} value={principio}>
                    {principio}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded"
                value={filtrosTemporarios.pais}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, pais: e.target.value })
                }
              >
                <option value="">Todos os países</option>
                {paisesDisponiveis.map((pais, idx) => (
                  <option key={idx} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Dosagem mínima"
                value={filtrosTemporarios.dosagemMin}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, dosagemMin: e.target.value })
                }
              />

              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Dosagem máxima"
                value={filtrosTemporarios.dosagemMax}
                onChange={(e) =>
                  setFiltrosTemporarios({ ...filtrosTemporarios, dosagemMax: e.target.value })
                }
              />
            </div>

            {/* Botão de limpar */}
            <button
              type="button"
              className="mt-4 w-full py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
              onClick={handleClearFilters}
            >
              Limpar todos os filtros
            </button>
          </>
        </ReusableDialog>

      </div>

      {/* Histórico de pesquisa */}
      <ul className="flex gap-2 flex-wrap mb-4">
        {searchHistory.map((term, index) => (
          <div
            key={index}
            className="bg-red-400 flex gap-2 items-center rounded-xl px-2 py-1"
          >
            <li className="text-sm font-aceh font-light">{term}</li>
            <MdOutlineClose
              className="cursor-pointer"
              color="red"
              onClick={() => handleRemove(index)}
            />
          </div>
        ))}
      </ul>

      {/* Resultados */}
      <div className="w-full flex flex-col gap-4">
        {isLoading ? (
          <p className="text-gray-500 text-lg font-medium text-center">
            🔄 Carregando produtos...
          </p>
        ) : (
          <Card itens={resPaginados} />
        )}
      </div>

      {/* Paginação */}
      {resFiltrados.length > itensPorPagina && (
        <div className="flex gap-4 justify-center items-center mt-6">
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 0))}
            disabled={pagina === 0}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {pagina + 1} de {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas - 1))}
            disabled={pagina === totalPaginas - 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export { DashBoard };
