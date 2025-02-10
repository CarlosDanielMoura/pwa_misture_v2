import { twMerge } from "tailwind-merge";
import { iconsData } from "../data/IconsData";
import { FC, useState } from "react";

interface NavBarBottomProps {
  className?: string;
}

const NavBarBottom: React.FC<NavBarBottomProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Estado para o botão ativo
  return (
    <nav
      className={twMerge(
        `fixed bottom-0 left-0 right-0 bg-white-600 flex justify-around items-center h-16  shadow-md`,
        `${className}`
      )}
    >
      {iconsData.map((item: any, index: number) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`relative w-full h-full flex items-center justify-center `}
          >
            {activeIndex === index && (
              <div className="absolute bg-green-700 w-2/4 h-1 top-0 rounded-b-3xl transition-all duration-300 "></div>
            )}

            <button
              onClick={() => setActiveIndex(index)} // Define o botão como ativo ao clicar
              className={twMerge(
                "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
                item.activeClass
              )}
            >
              <Icon
                size={index == 2 ? 27 : 24}
                color={
                  activeIndex === index
                    ? "#379276"
                    : index === 2
                    ? "#379276"
                    : "#9D9D9D"
                }
              />
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export { NavBarBottom };
