import React, { FC, useState } from "react";
import { useBoards } from "@/redux/selector/board";
import SearchedTaskCard from "./SearchedTaskCard";
import { SearchedTask } from "@/types/types";
import ActionButton from "../actions/ActionButtons";

interface Props {
    className?: string;
    isDrawer?: boolean
}

const Search: FC<Props> = ({ className, isDrawer }) => {
    const { boards } = useBoards();
    const [query, setQuery] = useState("");
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setQuery(searchText);

        if (searchText.trim() === "") {
            setFilteredTasks([]);
            return;
        }

        const tasks = boards.flatMap((board) =>
            board.tasks?.filter((task) =>
                task.title.toLowerCase().includes(searchText.toLowerCase())
            ).map((task) => ({
                ...task,
                boardTitle: board.title,
            }))
        );

        setFilteredTasks(tasks);
    };

    return (
        <div className="flex flex-row ">
            <div className={`px-4 overflow-y-auto  ${className}`}>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Buscar tareas..."
                    className={` py-1 border-2 rounded-full bg-transparent px-2 outline-none mb-4 text-black dark:text-white placeholder:text-gray-500 ${isDrawer ? "border-dark-primary" : "border-light-secondary dark:border-dark-secondary"} `}
                />
                <div className="w-full space-y-3 flex flex-wrap gap-3">
                    {filteredTasks.map((task) => (
                        <SearchedTaskCard key={task.id} task={task} isDrawer={isDrawer} />
                    ))}
                </div>
            </div>
            <div className="h-full w-[70px] 2xl:hidden">
                <ActionButton hideDrawer={true} className="2xl:hidden" />
            </div>
        </div>
    );
};

export default Search;
