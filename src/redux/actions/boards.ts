import { Board, Task } from "@/types/types";

export type BoardActionType =
  | ReturnType<typeof addBoardAction>
  | ReturnType<typeof setBoardsAction>
  | ReturnType<typeof updateBoardAction>
  | ReturnType<typeof deleteBoardAction>
  | ReturnType<typeof addTaskToBoardAction>
  | ReturnType<typeof removeTaskFromBoardAction>
  | ReturnType<typeof setTasksForBoardAction>
  | ReturnType<typeof updateTaskInBoardAction>
  | ReturnType<typeof setDetailBoardAction>;

// Acciones relacionadas con boards
export const addBoardAction = (board: Board) => ({
  type: "ADD_BOARD" as const,
  payload: board,
});

export const setDetailBoardAction = (board: Board) => ({
  type: "SET_DETAIL_BOARD" as const,
  payload: board,
});

export const setBoardsAction = (boards: Board[]) => ({
  type: "SET_BOARDS" as const,
  payload: boards,
});

export const updateBoardAction = (board: Board) => ({
  type: "UPDATE_BOARD" as const,
  payload: board,
});

export const deleteBoardAction = (id: string) => ({
  type: "DELETE_BOARD" as const,
  payload: id,
});

// Acciones relacionadas con tasks dentro de boards
export const addTaskToBoardAction = (boardId: string, task: Task) => ({
  type: "ADD_TASK_TO_BOARD" as const,
  payload: { boardId, task },
});

export const removeTaskFromBoardAction = (boardId: string, taskId: string) => ({
  type: "REMOVE_TASK_FROM_BOARD" as const,
  payload: { boardId, taskId },
});

export const setTasksForBoardAction = (boardId: string, tasks: Task[]) => ({
  type: "SET_TASKS_FOR_BOARD" as const,
  payload: { boardId, tasks },
});

export const updateTaskInBoardAction = (boardId: string, task: Task) => ({
  type: "UPDATE_TASK_IN_BOARD" as const,
  payload: { boardId, task },
});
