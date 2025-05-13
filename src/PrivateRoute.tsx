import { useUserStore } from "@/store/userStore";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user } = useUserStore();
    if (!user?.id) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
