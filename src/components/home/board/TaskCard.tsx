import { Task } from "@/types/types";
import React, { FC } from "react";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";

interface Props {
    task: Task;
    index: number; // Agregado para que Draggable use el índice
}

// Mapeo de colores para Tailwind
const colorMap: Record<string, string> = {
    "red-100": "bg-red-100 text-red-600",
    "blue-100": "bg-blue-100 text-blue-600",
    "green-100": "bg-green-100 text-green-600",
    "yellow-100": "bg-yellow-100 text-yellow-600",
    "purple-100": "bg-purple-100 text-purple-600",
    "orange-100": "bg-orange-100 text-orange-600",
    "pink-100": "bg-pink-100 text-pink-600",
    "teal-100": "bg-teal-100 text-teal-600",
    "cyan-100": "bg-cyan-100 text-cyan-600",
    "lime-100": "bg-lime-100 text-lime-600",
};

const TaskCard: FC<Props> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="space-y-2 bg-light-primary dark:bg-dark-primary rounded-xl p-2 max-w-[250px]"
                >
                    {task.image && (
                        <img
                            className="rounded-lg w-full h-[70px] object-cover"
                            src={task.image}
                            alt={task.title}
                        />
                    )}
                    <p>{task.title}</p>
                    {task.tags && (
                        <div className="flex flex-wrap gap-2 items-center justify-start">
                            {task.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className={clsx(
                                        "px-1 text-[10px] border rounded",
                                        colorMap[tag.color] || "bg-gray-100 text-gray-600" // Clase por defecto si el color no está en el mapa
                                    )}
                                >
                                    <p>{tag.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
