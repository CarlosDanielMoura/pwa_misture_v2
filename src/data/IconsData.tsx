// Usando HeroIcons como exemplo

import { Settings, UserRound } from "lucide-react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { MdInsertChartOutlined } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";

interface IconData {
  id: number;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Tipo do ícone
  activeClass?: string; // Classe opcional para estilos ativos
  path: string; // Caminho para navegação
  isRemoved?: boolean; // Validação opcional
}
const iconsData: IconData[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: GoHomeFill,
    path: "/",
  },
  {
    id: 2,
    label: "Chart Stats",
    icon: MdInsertChartOutlined,
    path: "/graph",
  },
  {
    id: 4,
    label: "Profile",
    icon: UserRound,
    path: "/profile",
  },
  {
    id: 5,
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];


export { iconsData };
