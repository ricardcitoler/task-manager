import { Reducer } from "@reduxjs/toolkit";
import { produce } from "immer";
import { Task } from "@/types/types";
import { ActionType } from "../actions/tasks";

interface State {
  detailTask: Task | null;
  tasks: Task[];
}

const initialState: State = {
  detailTask: null,
  tasks: [],
};

const tasksReducer: Reducer<State, ActionType> = (
  state = initialState,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SET_TASKS":
        draft.tasks = action.payload as Task[];
        break;
      case "SET_DETAIL_TASK":
        draft.detailTask = action.payload as Task | null;
        break;
      case "ADD_TASK":
        draft.tasks.push(action.payload as Task);
        break;
      default:
        break;
    }
  });
};

export default tasksReducer;
