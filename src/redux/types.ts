import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./reducers";

/**
 * Type for Thunk action creators in Redux.
 * Represents a function that creates a Thunk action.
 */
export type ThunkActionCreator = ActionCreator<
  ThunkAction<void, RootState, never, Action>
>;
