import { Reducer } from "@reduxjs/toolkit";
import { produce, Draft } from "immer";
import { BoardActionType } from "../actions/boards";
import { Board } from "@/types/types";

interface BoardsState {
  boards: Board[];
  detailBoard?: Board | null;
  isSearchDrawerOpen: boolean;
}

const initialState: BoardsState = {
  boards: [],
  detailBoard: null,
  isSearchDrawerOpen: false,
};

const boardsReducer: Reducer<BoardsState, BoardActionType> = (
  state = initialState,
  action
) => {
  return produce(state, (draft: Draft<BoardsState>) => {
    switch (action.type) {
      case "SET_BOARDS":
        draft.boards = action.payload;
        break;
      case "SET_SEARCH_DRAWER":
        draft.isSearchDrawerOpen = action.payload;
        break;

      case "SET_DETAIL_BOARD":
        draft.detailBoard = action.payload;
        break;
      case "ADD_BOARD":
        draft.boards.push(action.payload);
        break;

      case "UPDATE_BOARD": {
        const index = draft.boards.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          draft.boards[index] = action.payload;
        }
        break;
      }

      case "DELETE_BOARD":
        draft.boards = draft.boards.filter(
          (board) => board.id !== action.payload
        );
        break;

      case "ADD_TASK_TO_BOARD": {
        const { boardId, task } = action.payload;
        const boardIndex = draft.boards.findIndex((b) => b.id === boardId);

        if (boardIndex !== -1) {
          const board = draft.boards[boardIndex];

          // Añadir la tarea al array de tareas del tablero
          board.tasks = [...(board.tasks || []), task];

          // Si el detailBoard coincide con este boardId, actualízalo también
          if (draft.detailBoard?.id === boardId) {
            draft.detailBoard.tasks = board.tasks;
          }
        }
        break;
      }

      case "REMOVE_TASK_FROM_BOARD": {
        const { boardId, taskId } = action.payload;
        const board = draft.boards.find((b) => b.id === boardId);
        if (board && board.tasks) {
          board.tasks = board.tasks.filter((task) => task.id !== taskId);
        }
        break;
      }

      case "SET_TASKS_FOR_BOARD": {
        const { boardId, tasks } = action.payload;
        const board = draft.boards.find((b) => b.id === boardId);
        if (board) {
          board.tasks = tasks;
        }
        break;
      }

      case "UPDATE_TASK_IN_BOARD": {
        const { boardId, task } = action.payload;
        const board = draft.boards.find((b) => b.id === boardId);
        if (board && board.tasks) {
          const taskIndex = board.tasks.findIndex((t) => t.id === task.id);
          if (taskIndex !== -1) {
            board.tasks[taskIndex] = task;
          }
        }
        break;
      }
      case "TOGGLE_SEARCHDRAWER":
        draft.isSearchDrawerOpen = action.payload;
        break;
      default:
        break;
    }
  });
};

export default boardsReducer;
