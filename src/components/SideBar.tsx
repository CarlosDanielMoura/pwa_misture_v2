import { twMerge } from "tailwind-merge";
import Img_Logo from "../assets/LOGO_MISTURE.png";

import { useState } from "react";
import { iconsData } from "../data/IconsData";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-toastify";

interface Props {
  className?: string;
}

const SideBar: React.FC<Props> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

 const handleLogout = async () => {
  const proxiedURL = `https://mistureapp.com.br/proxy.php?url=${encodeURIComponent(
    "https://mistureapp.com.br/controller/UsuarioController.php?deslogar"
  )}`;

  try {
    const response = await fetch(proxiedURL, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      logout();
      navigate("/");
    } else {
      toast.error("Erro ao deslogar. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao deslogar:", error);
    toast.error("Erro ao deslogar. Tente novamente.");
  }
};


  return (
    <div className={twMerge(location.pathname === '/login' ? 'hidden' : 'block', className)}>
      <div className="flex flex-col w-80 h-screen bg-green-600 rounded-r-xl p-7">
        <header className="h-28 grow-1 flex items-center justify-center">
          <img src={Img_Logo} width={200} alt="Logo Sistema pwa Misture" />
        </header>
        <main className="grow mt-16">
          <h1 className="text-white-400 text-2xl font-normal font-jura">Menu</h1>
          <div className="mt-7">
            {iconsData
              .filter((item) => !item.isRemoved)
              .map((item, index: number) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-56 h-12 rounded-lg flex items-center space-x-4 p-4 text-white-400 font-semibold cursor-pointer font-aceh text-lg tracking-widest ${activeIndex === index ? "bg-green-400 text-green-500" : ""}`}
                  >
                    <Link
                      to={item.path}
                      className={`${activeIndex === index ? "text-green-500" : ""} flex gap-3`}
                    >
                      <Icon fontSize={24} className={`${activeIndex === index ? "text-green-500" : ""}`} />
                      {item.label}
                    </Link>
                  </div>
                );
              })}
          </div>
        </main>
        <footer className="h-28 grow-1 flex items-center">
          <header>
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </header>
          <main className="ml-2 w-full">
            <h1 className="text-sm font-bold text-white-400 leading-normal tracking-widest whitespace-nowrap font-jura">
              {user?.nome}
            </h1>
            <h2 className="text-xs font-light text-white-400 leading-normal tracking-widest font-jura">
              {user?.perfilDesc}
            </h2>
          </main>
          <footer className="w-full text-end">
            <button onClick={handleLogout}>
              <TbLogout size={24} className="text-white-400" />
            </button>
          </footer>
        </footer>
      </div>
    </div>
  );
};

export { SideBar };
