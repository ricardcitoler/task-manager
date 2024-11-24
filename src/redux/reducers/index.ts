import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";
import boardsReducer from "./boardsReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  boards: boardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
