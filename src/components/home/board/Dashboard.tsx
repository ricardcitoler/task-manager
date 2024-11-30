"use client";
import React, { FC, useState } from "react";
import { useBoards } from "@/redux/selector/board";
import { Task, TaskState } from "@/types/types";
import Column from "./Column";
import {
    DragDropContext,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { updateTaskInBoardAction } from "@/redux/actions/boards";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface Props {
    className?: string;
}

const Dashboard: FC<Props> = ({ className }) => {
    const { detailBoard } = useBoards();
    const initialTasks = detailBoard?.tasks || [];
    const dispatch: Dispatch<any> = useDispatch();
    {/* <AddTaskButton /> */ }
    // Dividimos las tareas según su estado
    const [groupedTasks, setGroupedTasks] = useState<Record<TaskState, Task[]>>({
        BACKLOG: [],
        IN_PROGRESS: [],
        IN_REVIEW: [],
        COMPLETED: [],
    });

    // Inicializamos las tareas en groupedTasks al cargar
    React.useEffect(() => {
        const grouped: Record<TaskState, Task[]> = {
            BACKLOG: [],
            IN_PROGRESS: [],
            IN_REVIEW: [],
            COMPLETED: [],
        };
        initialTasks.forEach((task) => {
            grouped[task.status].push(task);
        });
        setGroupedTasks(grouped);
    }, [initialTasks]);

    // Maneja el evento de soltar tareas
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // Si no hay destino, no hacemos nada
        if (!destination) return;

        // Si el destino es la misma columna, reordenamos
        if (source.droppableId === destination.droppableId) {
            const tasks = Array.from(groupedTasks[source.droppableId as TaskState]);
            const [movedTask] = tasks.splice(source.index, 1);
            tasks.splice(destination.index, 0, movedTask);

            setGroupedTasks((prev) => ({
                ...prev,
                [source.droppableId as TaskState]: tasks,
            }));
        } else {
            // Si la tarea se mueve a otra columna
            const sourceTasks = Array.from(groupedTasks[source.droppableId as TaskState]);
            const destinationTasks = Array.from(groupedTasks[destination.droppableId as TaskState]);

            const [movedTask] = sourceTasks.splice(source.index, 1);

            // Actualizamos el estado de la tarea
            const updatedTask = { ...movedTask, status: destination.droppableId as TaskState };

            destinationTasks.splice(destination.index, 0, updatedTask);

            setGroupedTasks((prev) => ({
                ...prev,
                [source.droppableId as TaskState]: sourceTasks,
                [destination.droppableId as TaskState]: destinationTasks,
            }));

            // Aquí despachamos la acción para actualizar la tarea en el estado global
            if (detailBoard) {
                dispatch(updateTaskInBoardAction(detailBoard.id, updatedTask));
            }
        }
    };

    const taskStates: TaskState[] = ["BACKLOG", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"];

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                className={`grid grid-cols-1 md:grid-cols-4 max-w-[1100px] overflow-y-auto gap-4 px-4 pb-4 justify-center bg-light-secondary dark:bg-dark-secondary rounded-xl ${className}`}
            >
                {taskStates.map((status) => (
                    <Droppable key={status} droppableId={status}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="space-y-3 "
                            >
                                <Column
                                    key={status}
                                    status={status}
                                    title={status.replace("_", " ")}
                                    tasks={groupedTasks[status]}
                                />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Dashboard;
