import IMG_LOGO from "@/assets/LOGO_MISTURE.png";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router";

const steps = [
  { id: "step1", label: "Email" },
  { id: "step2", label: "Conta" },
  { id: "step3", label: "Confirmação" },
];

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

interface Perfil {
  id: number;
  descricao: string;
}

const proxiedUrl = (url: string) =>
  `https://mistureapp.com.br/proxy.php?url=${encodeURIComponent(url)}`;

const Login = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState("");
  const { setUser, user } = useUserStore();
  const navigate = useNavigate();

  const API_BASE = "https://mistureapp.com.br/controller";

  function isEmailValido(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

  
  const handleVerificarEmail = async () => {
  if (!isEmailValido(email)) {
    toast.warn("Digite um email válido.");
    return;
  }

  try {
    const rawUrl = `${API_BASE}/AppUserController.php?getByEmail=${encodeURIComponent(email)}`;
    const url = `https://mistureapp.com.br/proxy.php?url=${encodeURIComponent(rawUrl)}`;

    const res = await fetch(url);

    if (res.status === 404) {
      // Email não encontrado - leva para cadastro
      toast.info("Email não encontrado. Preencha os dados para cadastro.");
      setCurrentStep(1);
      return;
    }

    if (!res.ok) {
      // Outro erro qualquer
      toast.error(`Erro na requisição: ${res.status} ${res.statusText}`);
      return;
    }

    const user = await res.json();

    if (user && user.id) {
      setUser({
        id: user.id,
        email: user.email,
        nome: user.nome,
        perfilId: user.perfil.id.toString(),
        perfilDesc: user.perfil.descricao,
        cidade: user.cidade,
        estado: user.uf.toUpperCase(),
      });

      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      // Caso raro - API não retornou usuário nem 404
      toast.info("Email não encontrado. Preencha os dados para cadastro.");
      setCurrentStep(1);
    }
  } catch (err) {
    toast.error("Erro ao verificar email. Tente novamente.");
  }
};

  const handleFinalizar = async () => {
  const payload = new URLSearchParams({
    email,
    uf: estadoSelecionado,
    nome,
    cidade: cidadeSelecionada,
    perfilId: perfilSelecionado,
  });

  const rawUrl = `${API_BASE}/AppUserController.php`;
  const proxyUrl = `https://mistureapp.com.br/proxy.php?url=${encodeURIComponent(rawUrl)}`;

  try {
    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });

    if (!res.ok) {
      toast.error(`Erro ao cadastrar: ${res.status} ${res.statusText}`);
      return;
    }

    toast.success("Cadastro realizado com sucesso!");
    navigate("/dashboard");
  } catch (error) {
    toast.error("Erro ao cadastrar. Tente novamente.");
  }
};
  useEffect(() => {
    // Busca estados IBGE direto (não precisa proxy)
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        const ordenados = data.sort((a: Estado, b: Estado) =>
          a.nome.localeCompare(b.nome)
        );
        setEstados(ordenados);
      });

    // Busca perfis via proxy
    fetch(proxiedUrl(`${API_BASE}/PerfilController.php?getAll`))
      .then((res) => {
        if (!res.ok) {
          toast.error(`Erro ao carregar perfis: ${res.status}`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setPerfis(data);
      });
  }, []);

  useEffect(() => {
    if (user?.id) {
      navigate("/dashboard");
    }
    if (estadoSelecionado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      )
        .then((res) => res.json())
        .then((data) => setCidades(data));
    }
  }, [estadoSelecionado]);

  return (
    <div className="flex w-full h-screen bg-white-400">
      <div className="flex flex-1 justify-center items-center hidden lg:flex bg-gradient-to-r from-green-600 to-green-400">
        <img src={IMG_LOGO} width={400} height={400} alt="logo MistuRe Web App" />
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <Tabs value={steps[currentStep].id} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            {steps.map((step, idx) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                disabled={idx > currentStep}
              >
                {step.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="step1">
            <div className="p-4 flex flex-col justify-between min-h-[300px]">
              <h2 className="text-xl font-bold mb-4">Digite seu Email</h2>
              <Input
                placeholder="Seu email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="mt-4 bg-green-500 w-[84px]" onClick={handleVerificarEmail}>
                Próximo
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="step2">
            <div className="p-4 flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-2">Dados da Conta</h2>
                <Input
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Select
                  value={estadoSelecionado}
                  onValueChange={(val) => {
                    setEstadoSelecionado(val);
                    setCidadeSelecionada("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-md shadow-lg border border-gray-300 rounded-xl text-black">
                    {estados.map((estado) => (
                      <SelectItem key={estado.id} value={estado.sigla}>
                        {estado.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={cidadeSelecionada}
                  onValueChange={(val) => setCidadeSelecionada(val)}
                  disabled={!estadoSelecionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-md shadow-lg border border-gray-300 rounded-xl text-black">
                    {cidades.map((cidade) => (
                      <SelectItem key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={perfilSelecionado}
                  onValueChange={(val) => setPerfilSelecionado(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-md shadow-lg border border-gray-300 rounded-xl text-black">
                    {perfis.map((perfil) => (
                      <SelectItem key={perfil.id} value={String(perfil.id)}>
                        {perfil.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="secondary" onClick={() => setCurrentStep(0)}>
                  Voltar
                </Button>
                <Button
                  onClick={() => {
                    if (nome && cidadeSelecionada && perfilSelecionado)
                      setCurrentStep(2);
                    else toast.warn("Preencha todos os campos.");
                  }}
                  className="bg-green-500"
                >
                  Próximo
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step3">
            <div className="p-4 flex flex-col justify-between min-h-[300px]">
              <h2 className="text-xl font-bold mb-4">Confirmação</h2>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Nome:</strong> {nome}</p>
              <p><strong>Estado:</strong> {estadoSelecionado}</p>
              <p><strong>Cidade:</strong> {cidadeSelecionada}</p>
              <div className="flex justify-between mt-4">
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                  Voltar
                </Button>
                <Button onClick={handleFinalizar} className="bg-green-500">
                  Finalizar
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export { Login };
