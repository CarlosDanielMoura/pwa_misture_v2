import { Fragment } from "react/jsx-runtime";
import Img_Logo from "../assets/LOGO_MISTURE.png";
import { twMerge } from "tailwind-merge";
import { UserRound } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useUserStore } from "@/store/userStore";
import { TbLogout } from "react-icons/tb";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

  const { logout } = useUserStore()


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
    } else {
     toast.error("Erro ao deslogar. Tente novamente.");
    }
  } catch (error) {
     toast.error("Erro ao deslogar. Tente novamente.");
  }
};


  return (
    <Fragment>
      <header
        className={twMerge(
          `flex justify-between items-center h-20 w-full bg-green-500 px-8 py-3`,
          `${className}`
        )}
      >
        <img src={Img_Logo} width={200} alt="Logo Sistema pwa Misture" />
        <span className="flex justify-center items-center w-10 h-10 border-none  rounded-lg hover:cursor-pointer hover:shadow-md hover:opacity-85">
          <button onClick={handleLogout}>
            <TbLogout size={24} className="text-white-400" />
          </button>
        </span>
      </header>
    </Fragment>
  );
};
export { Header };
