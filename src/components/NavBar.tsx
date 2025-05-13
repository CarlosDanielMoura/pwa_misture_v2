import { twMerge } from "tailwind-merge";
import { iconsData } from "../data/IconsData";
import { useState } from "react";
import { Link } from "react-router";

interface NavBarBottomProps {
  className?: string;
}

const NavBarBottom: React.FC<NavBarBottomProps> = ({ className }) => {
  // Inicializando o primeiro ícone como ativo por padrão, se desejado
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <nav
      className={twMerge(
        `fixed bottom-0 left-0 right-0 bg-white-600 flex justify-around items-center h-16 shadow-md z-30`,
        `${className}`
      )}
    >
      {iconsData.map((item: any, index: number) => {
        const Icon = item.icon;
        const isActive = activeIndex === index; // Verifica se o ícone está ativo

        return (
          <div
            key={item.id}
            className={`relative w-full h-full flex items-center justify-center`}
          >
            {isActive && (
              <div className="absolute bg-green-700 w-2/4 h-1 top-0 rounded-b-3xl transition-all duration-300"></div>
            )}
            <Link
              to={item.path}
              className={`${isActive ? "text-green-500" : ""} flex gap-3`}
            >
              <button
                onClick={() => setActiveIndex(index)} // Define o ícone como ativo ao clicar
                className={twMerge(
                  "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
                  item.activeClass
                )}
              >
                <Icon
                  size={index === 2 ? 27 : 24}
                  color={isActive ? "#379276" : "#9D9D9D"} // Aplica verde apenas ao ícone ativo
                />
              </button>
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export { NavBarBottom };
