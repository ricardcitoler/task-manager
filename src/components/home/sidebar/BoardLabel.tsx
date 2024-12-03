"use client";
import { setDetailBoardAction } from "@/redux/actions/boards";
import { useBoards } from "@/redux/selector/board";
import { Board } from "@/types/types";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface Props {
    board: Board;
}

const BoardLabel: FC<Props> = ({ board }) => {
    const [isSelected, setIsSelected] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const { detailBoard } = useBoards();

    const handleSelectBoard = () => {
        dispatch(setDetailBoardAction(board));
    };

    useEffect(() => {
        if (detailBoard?.id === board.id) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [detailBoard]);

    return (
        <div className="pr-1">
            <button
                onClick={handleSelectBoard}
                className={`flex items-center justify-start gap-2 px-2 py-1 ${isSelected ? "border-2 border-blue-600 rounded-full" : ""
                    }`}
            >
                {board.logo && (
                    <Image
                        src={board.logo}
                        alt={`${board.title} logo`}
                        className="w-6 h-6 rounded-full object-cover"
                        width={10}
                        height={10}
                    />
                )}
                <p className="truncate text-sm font-medium text-black dark:text-white hidden md:block">
                    {board.title}
                </p>
            </button>
        </div>
    );
};

export default BoardLabel;
