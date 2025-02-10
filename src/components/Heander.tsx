import { Fragment } from "react/jsx-runtime";
import Img_Logo from "../assets/LOGO_MISTURE.png";
import { twMerge } from "tailwind-merge";
import { UserRound } from "lucide-react";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <Fragment>
      <header
        className={twMerge(
          `flex justify-between items-center h-20 w-full bg-green-500 px-8`,
          `${className}`
        )}
      >
        <img src={Img_Logo} alt="Logo Sistema pwa Misture" />
        <span className="flex justify-center items-center w-10 h-10 border-none bg-white-600 rounded-lg hover:cursor-pointer hover:shadow-md hover:opacity-85">
          <UserRound size={24} color="#379276" />
        </span>
      </header>
    </Fragment>
  );
};
export { Header };
