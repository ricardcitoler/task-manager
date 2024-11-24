import { Board } from "@/types/types";
import React, { FC } from "react";

interface Props {
    board: Board;
}

const BoardLabel: FC<Props> = ({ board }) => {
    return (
        <div>
            <button className="flex items-center justify-start gap-2 ">
                {board.logo && (
                    <img
                        src={board.logo}
                        alt={`${board.title} logo`}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                )}
                <p className="truncate text-sm font-medium text-black dark:text-white">
                    {board.title}
                </p>
            </button>
        </div>

    );
};

export default BoardLabel;
