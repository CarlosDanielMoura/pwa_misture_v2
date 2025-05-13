import { Header } from "@/components/Header";
import { NavBarBottom } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import { AppRoutes } from "@/Router";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

export const AppLayout = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col lg:flex-row h-screen">

            {location.pathname !== "/" && (
                <>
                    <NavBarBottom className="lg:hidden" />
                    <Header className="lg:hidden" />
                </>
            )}
            {location.pathname !== "/" && <SideBar className="hidden lg:block" />}

            <ToastContainer position="top-right" autoClose={4000} />
            <AppRoutes />
        </div>
    );
};
