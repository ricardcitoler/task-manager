import React, { FC, useState } from "react";
import Fuse from "fuse.js";
import { useBoards } from "@/redux/selector/board";

interface Props {
    className?: string;
}

const Search: FC<Props> = ({ className }) => {
    const { boards } = useBoards(); // Obtiene los boards desde el selector de Redux
    const [query, setQuery] = useState(""); // Estado para el texto de búsqueda
    const [results, setResults] = useState(boards || []); // Estado para los resultados de búsqueda

    // Configuración de Fuse.js
    const fuse = new Fuse(boards, {
        keys: [
            "title",
            "tasks.title",
        ],
        threshold: 0,          // Coincidencia exacta
        includeMatches: true,
        useExtendedSearch: true, // Activar búsqueda extendida
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setQuery(searchText);

        if (!searchText) {
            setResults(boards); // Si no hay texto, muestra todos los boards
        } else {
            const searchResults = fuse.search(searchText).map((result) => result.item);
            setResults(searchResults);
        }
    };

    return (
        <div className={`p-4 overflow-y-auto ${className}`}>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Buscar boards o tareas..."
                className="w-full p-2 border rounded mb-4 dark:text-black"
            />
            <div className="w-full">
                {results.length > 0 ? (
                    results.map((board) => (
                        <div key={board.id} className="mb-4 p-4 border rounded">
                            <h2 className="text-xl font-bold">{board.title}</h2>
                            {board.tasks && (
                                <ul className="ml-4">
                                    {board.tasks.map((task) => (
                                        <li key={task.id} className="text-sm">
                                            - {task.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
};

export default Search;
