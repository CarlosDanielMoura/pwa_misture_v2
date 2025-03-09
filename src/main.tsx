import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Header } from "./components/Header.tsx";
import { NavBarBottom } from "./components/NavBar.tsx";
import { SideBar } from "./components/SideBar.tsx";
import { iconsData } from "./data/IconsData.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header className="lg:hidden" />
    <SideBar className="hidden lg:block" />
    <NavBarBottom className="lg:hidden" />
    <App />
  </StrictMode>
);
