"use client";
import React, { FC } from "react";
import { useBoards } from "@/redux/selector/board";
import { Task, TaskState } from "@/types/types";
import TaskCard from "./TaskCard";
import Column from "./Column"; // Reutilizamos el componente Column
import {
    DragDropContext,
} from "@hello-pangea/dnd";

interface Props {
    className?: string;
}

const Dashboard: FC<Props> = ({ className }) => {
    const { detailBoard } = useBoards();
    const tasks = detailBoard?.tasks || [];

    // Dividimos las tareas según su estado
    const groupedTasks: Record<TaskState, Task[]> = {
        BACKLOG: [],
        IN_PROGRESS: [],
        IN_REVIEW: [],
        COMPLETED: [],
    };

    tasks.forEach((task) => {
        if (groupedTasks[task.state as TaskState]) {
            groupedTasks[task.state as TaskState].push(task);
        }
    });

    // Mapear columnas basadas en los estados
    const taskStates: TaskState[] = ["BACKLOG", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"];

    return (
        <>
            {/* <DragDropContext onDragEnd={}> */}
            <div
                className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 justify-center bg-light-secondary dark:bg-dark-secondary rounded-xl ${className}`}
            >
                {taskStates.map((state) => (
                    <Column key={state} state={state} title={state.replace("_", " ")} tasks={groupedTasks[state]} />
                ))}
            </div>
            {/* </DragDropContext> */}
        </>

    );
};

export default Dashboard;
