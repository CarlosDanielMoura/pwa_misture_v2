import { iconesPorCultura } from "@/lib/culturasData";
import { extrairPrimeiroNome } from "../Utils/ExtName";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { normalizeText } from "@/Utils/normalizeText";

type Classe = {
    descricao: string;
    cor: string;
};

type Substancia = {
    sub_id: number;
    principio_ativo: string;
    dosagem_substancia: number;
    classe: Classe;
    nome_comercial?: string;
};

type Referencia = {
    id: string;
    link: string;
    pais: string;
    titulo: string;
};

type Item = {
    id: number;
    status: string;
    resultado: string;
    cultura: string;
    comentario: string | null;
    substancias: Substancia[];
    referencia: Referencia;
};

interface CardProps {
    itens: Item[];
}

const Card = ({ itens }: CardProps) => {
    return (
        <div className="w-full bg-white-600 rounded-2xl shadow-md p-4 flex flex-wrap gap-6 justify-center">
            {itens.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
            ) : (
                itens.slice(0, 30).map((item) => {
                    const culturaKey = extrairPrimeiroNome(normalizeText(item.cultura || "nd"));
                    const icone = iconesPorCultura[culturaKey] || iconesPorCultura["nd"];

                    return (
                        <div key={item.id} className="mb-6 border rounded-2xl min-w-xs min-h-64">
                            <div className="flex justify-between bg-gray-400 rounded-t-2xl h-14">
                                <div className="flex gap-5 items-center p-4">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <img
                                                    src={icone}
                                                    alt={item.cultura}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.cultura || "Não definido"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <p className="text-lg font-semibold text-green-700 mb-2">
                                        {item.cultura === "ND" || !item.cultura
                                            ? "Não definido"
                                            : extrairPrimeiroNome(item.cultura)}
                                    </p>
                                </div>

                                <p className="text-green-600 p-4">{item.resultado.toUpperCase()}</p>
                            </div>

                            <table className="w-full text-left text-sm mt-7">
                                <thead>
                                    <tr className="p-4">
                                        <th className="py-1 font-medium text-gray-600 p-4">Produtos</th>
                                        <th className="py-1 font-medium text-gray-600">Dose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.substancias.map((sub) => (
                                        <tr key={sub.sub_id} className="border-t">
                                            <td className="pt-2 p-4 text-xs">
                                                <span className="font-semibold text-black">{sub.nome_comercial ?? "Robust"}</span>
                                                <br />
                                                <span className="text-gray-500">{extrairPrimeiroNome(sub.principio_ativo)}</span>
                                            </td>
                                            <td className="pt-2">{sub.dosagem_substancia.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export { Card };
