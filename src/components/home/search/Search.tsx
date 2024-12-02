import React, { FC, useState } from "react";
import { useBoards } from "@/redux/selector/board";
import SearchedTaskCard from "./SearchedTaskCard";
import { Tooltip } from "flowbite-react";
import { FcSearch } from "react-icons/fc";
import { setSearchDrawerAction } from "@/redux/actions/boards";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface Props {
    className?: string;
    isDrawer?: boolean
}

const Search: FC<Props> = ({ className, isDrawer }) => {
    const { boards, isSearchDrawerOpen } = useBoards();
    const [query, setQuery] = useState("");
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
    const dispatch: Dispatch<any> = useDispatch();


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

    const handleCloseDrawer = () => {
        dispatch(setSearchDrawerAction(false))
        console.log("isSearchDrawerOpen", isSearchDrawerOpen)
    }

    return (
        <div className="flex flex-row relative">
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
            {isSearchDrawerOpen &&
                (<span className="absolute top-0 right-8">
                    <Tooltip content={isSearchDrawerOpen ? "Close Searchbar" : "Open Searchbar"}>
                        <button
                            className="rounded-full flex items-center justify-center"
                            onClick={handleCloseDrawer}
                        >
                            <FcSearch className="w-10 h-10" />
                        </button>
                    </Tooltip>
                </span>)}
        </div>
    );
};

export default Search;
