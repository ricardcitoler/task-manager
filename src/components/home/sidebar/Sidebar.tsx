"use client";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { useBoards } from "@/redux/selector/board";
import React, { FC, useEffect, useState } from "react";
import BoardLabel from "./BoardLabel";
import { FaCirclePlus } from "react-icons/fa6";
import { addBoardAction } from "@/redux/actions/boards";
import CreateBoardModal from "@/components/modals/CreateBoardModal";
import AddTaskButton from "@/components/ui/AddTaskButton";
import AddBoardButton from "@/components/ui/AddBoardButton";
interface Props {
    className?: string;
    setIsCreateBoardModalOpen: (value: boolean) => void;
    isCreateBoardModalOpen: boolean;
}
const Sidebar: FC<Props> = ({ className, setIsCreateBoardModalOpen }) => {
    const [isClient, setIsClient] = useState(false);
    const { boards } = useBoards();

    // Evita errores de hidratación
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className={`relative min-w-[78px] h-full flex flex-col ${className}`}>

            <div
                className="flex-1 overflow-y-auto space-y-5 overflow-x-hidden"
                style={{
                    paddingBottom: "1rem",
                    maxHeight: "calc(100% - 9rem)",
                }}
            >
                <h1
                    className="text-[20px] px-2 pb-2 bg-light-primary dark:bg-dark-primary sticky top-0 z-10"
                >
                    Boards
                </h1>
                {boards.map((board) => (
                    <BoardLabel key={board.id} board={board} />
                ))}

            </div>

            {/* Zona inferior fija */}
            <div className="w-full absolute bottom-3 space-y-3">
                <AddBoardButton onClick={() => setIsCreateBoardModalOpen(true)} />
                <AddTaskButton />
                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default Sidebar;
