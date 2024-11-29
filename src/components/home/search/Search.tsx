import React, { FC, useState } from "react";
import { useBoards } from "@/redux/selector/board";
import SearchedTaskCard from "./SearchedTaskCard";
import { SearchedTask } from "@/types/types";

interface Props {
    className?: string;
}

const Search: FC<Props> = ({ className }) => {
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
        <div className={`px-4 overflow-y-auto ${className}`}>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Buscar boards o tareas..."
                className="w-full p-2 border rounded mb-4 dark:text-black "
            />
            <div className="w-full space-y-3 flex flex-wrap gap-3">
                {filteredTasks.map((task) => (
                    <SearchedTaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Search;
