import { Task } from "@/types/types";
import { ThunkActionCreator } from "../types";

// Constantes para los tipos de acciones

// Tipos de acciones
export type ActionType = ReturnType<
  typeof addTaskAction | typeof setTasksAction | typeof setDetailTaskAction
>;

// Acciones sincronas
export const addTaskAction = (task: Task) => ({
  type: "ADD_TASK" as const,
  payload: task,
});

export const setTasksAction = (tasks: Task[]) => ({
  type: "SET_TASKS" as const,
  payload: tasks,
});

export const setDetailTaskAction = (task: Task | null) => ({
  type: "SET_DETAIL_TASK" as const,
  payload: task,
});

// Acción asíncrona para actualizar
export const updateTaskAction: ThunkActionCreator = (task: Task) => {
  return async (dispatch) => {
    try {
      dispatch(setDetailTaskAction(task));
    } catch (e) {
      console.error(e);
    }
  };
};

// Acción asíncrona para eliminar una tarea
export const deleteTaskAction: ThunkActionCreator = (id: string) => {
  return async (dispatch, getState) => {
    try {
      const tasks = getState().tasks.tasks.filter(
        (task: Task) => task.id !== id
      );
      dispatch(setTasksAction(tasks));
    } catch (e) {
      console.error(e);
    }
  };
};
