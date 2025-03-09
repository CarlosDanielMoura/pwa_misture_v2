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
}

const iconsData: IconData[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: GoHomeFill,
  },
  {
    id: 2,
    label: "Chart Stats",
    icon: MdInsertChartOutlined,
  },
  {
    id: 3,
    label: "Filter",
    icon: HiMiniSquares2X2,
    activeClass: "bg-green-400 text-green-700 rounded-full",
  },
  {
    id: 4,
    label: "Profile",
    icon: UserRound,
  },
  {
    id: 5,
    label: "Settings",
    icon: Settings,
  },
];

export { iconsData };
