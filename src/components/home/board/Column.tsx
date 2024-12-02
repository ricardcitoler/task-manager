import React, { FC } from "react";
import { Task, TaskState } from "@/types/types";
import TaskCard from "./TaskCard";
import { GoDotFill } from "react-icons/go";

interface ColumnProps {
    title: string; // Título de la columna (por ejemplo, "Backlog")
    tasks: Task[]; // Lista de tareas para esta columna
    status: TaskState
}

const Column: FC<ColumnProps> = ({ title, tasks, status }) => {

    const colorSelector = (status: string) => {
        switch (status) {
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

    const color = colorSelector(status);
    return (
        <div className="space-y-3 ">
            <h1 className="font-bold text-lg flex justify-start items-center sticky top-0 z-10 bg-light-secondary dark:bg-dark-secondary py-3">
                <GoDotFill className={`${color}`} />
                <p>{title}({tasks.length})</p>
            </h1>
            {tasks.map((task, index) => (
                <TaskCard index={index} key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Column;
