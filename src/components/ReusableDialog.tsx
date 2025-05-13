import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "./ui/dialog";

import { TbFilterCog } from "react-icons/tb";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface ReusableDialogProps {
    title: string;
    children: ReactNode;
    onConfirm: () => void;
    confirmText?: string;
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({
    title,
    children,
    onConfirm,
    confirmText = "Filtrar"
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-white-600 flex items-center justify-center rounded-xl cursor-pointer h-10 shadow ">
                    <TbFilterCog size={21} color="#379276" className="m-3" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md max-w-xs w-full bg-white-600 rounded-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="font-aceh text-xl sm:text-2xl font-semibold leading-normal">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col space-y-4 mt-2">{children}</div>

                <DialogFooter className="flex flex-row gap-2 justify-end pt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" className="w-full sm:w-24">
                            Fechar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="bg-green-600 text-white w-full sm:w-24"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReusableDialog;
