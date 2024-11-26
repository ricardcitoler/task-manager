import React, { FC } from "react";
import { Task, TaskState } from "@/types/types";
import TaskCard from "./TaskCard";
import { GoDotFill } from "react-icons/go";

interface ColumnProps {
    title: string; // Título de la columna (por ejemplo, "Backlog")
    tasks: Task[]; // Lista de tareas para esta columna
    state: TaskState
}

const Column: FC<ColumnProps> = ({ title, tasks, state }) => {

    const colorSelector = (state: string) => {
        switch (state) {
            case "BACKLOG":
                return "text-orange-600";
            case "IN_PROGRESS":
                return "text-yellow-600";
            case "IN_REVIEW":
                return "text-green-600";
            case "COMPLETED":
                return "text-indigo-600";
            default:
                return "text-gray-600";
        }
    }

    const color = colorSelector(state);
    return (
        <div className="space-y-3">
            <h1 className="font-bold text-lg flex justify-start items-center"><GoDotFill className={`${color}`} /><p>{title}</p></h1>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Column;
