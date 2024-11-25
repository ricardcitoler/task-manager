"use client";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { useBoards } from "@/redux/selector/board";
import React, { FC, useEffect, useState } from "react";
import BoardLabel from "./BoardLabel";
import { FaCirclePlus } from "react-icons/fa6";
import { addBoardAction } from "@/redux/actions/boards";
import CreateBoardModal from "@/components/modals/CreateBoardModal";
interface Props {
    className?: string;
    setIsCreateBoardModalOpen: (value: boolean) => void;
    isCreateBoardModalOpen: boolean;
}

const Sidebar: FC<Props> = ({ className, setIsCreateBoardModalOpen, isCreateBoardModalOpen }) => {
    const [isClient, setIsClient] = useState(false);
    const { boards } = useBoards()

    //para evitar errores de hidratación que da llamar al reducer de los boards
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className={`relative h-full flex flex-col overflow-hidden ${className}`}>
            <div className=" space-y-5 scroll-y-auto">
                <h1 className="text-[20px]">Boards</h1>
                {boards.map((board) => (
                    <BoardLabel key={board.id} board={board} />
                ))}
                <button
                    onClick={() => setIsCreateBoardModalOpen(true)}
                    className="flex items-center justify-center gap-2"
                >
                    <FaCirclePlus />
                    <p className="hidden md:block truncate">Add new board</p> {/* Oculto en pantallas pequeñas */}
                </button>
            </div>
            <div className="w-full absolute bottom-0">
                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default Sidebar;