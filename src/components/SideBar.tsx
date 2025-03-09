import { twMerge } from "tailwind-merge";
import Img_Logo from "../assets/LOGO_MISTURE.png";

import { useState } from "react";
import { iconsData } from "../data/IconsData";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TbLogout } from "react-icons/tb";

interface Props {
  className?: string;
}

const SideBar: React.FC<Props> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className={twMerge(``, `${className}`)}>
      <div className="flex flex-col w-80 h-screen bg-green-600 rounded-r-xl p-7">
        <header className="h-28 grow-1 flex items-center justify-center">
          <img src={Img_Logo} width={200} alt="Logo Sistema pwa Misture" />
        </header>
        <main className="grow mt-16">
          <h1 className="text-white-400 text-2xl l font-normal font-jura">
            Menu
          </h1>
          <div className="mt-7">
            {iconsData.map((item, index: number) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-56 h-12 rounded-lg flex items-center space-x-4 p-4 text-white-400 font-semibold cursor-pointer font-aceh text-lg tracking-widest ${
                    activeIndex === index ? "bg-green-400 text-green-500" : ""
                  }`}
                >
                  <Icon
                    fontSize={24}
                    className={` ${
                      activeIndex === index ? "text-green-500" : ""
                    }`}
                  />
                  <a
                    href="#"
                    className={` ${
                      activeIndex === index ? "text-green-500" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </div>
              );
            })}
          </div>
        </main>
        <footer className="h-28 grow-1 flex  items-center">
          <header className="">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </header>
          <main className="ml-2 w-full">
            <h1 className="text-sm font-bold text-white-400 leading-normal tracking-widest whitespace-nowrap font-jura">
              Carlos Daniel
            </h1>
            <h2 className="text-xs font-light text-white-400 leading-normal tracking-widest font-jura">
              Tecnico
            </h2>
          </main>
          <footer className="w-full text-end">
            <button>
              <TbLogout size={24} className="text-white-400" />
            </button>
          </footer>
        </footer>
      </div>
    </div>
  );
};

export { SideBar };
