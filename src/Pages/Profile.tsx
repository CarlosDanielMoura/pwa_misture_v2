import { useUserStore } from "@/store/userStore";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
    const { user } = useUserStore();

    if (!user) return null;

    // Captura a primeira letra do primeiro nome
    const getInitial = (name: string | undefined) => {
        if (!name) return "U";
        const firstName = name.split(" ")[0];
        return firstName.charAt(0).toUpperCase();
    };

    return (
        <div className="w-full h-full flex justify-center items-center ">
            <Card className="w-full max-w-md shadow-xl rounded-2xl p-6 bg-white ">
                <CardContent className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24 bg-blue-500 text-white text-3xl font-semibold">
                        <AvatarFallback>
                            {getInitial(user.nome)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <h2 className="text-xl font-semibold">{user.nome || "Usuário"}</h2>
                        <p className="text-sm text-gray-500">{user.email || "email@dominio.com"}</p>
                        <p className="text-sm text-gray-500 mt-1">{user.perfilDesc || "Função"}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export { Profile };
