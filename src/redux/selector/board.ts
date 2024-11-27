import { useSelector } from "react-redux";
import { RootState } from "../reducers";

/**
 * Custom hook to select the tasks status from the global Redux status.
 * @returns The tasks status from the Redux store.
 */
export const useBoards = () =>
  useSelector((status: RootState) => status.boards);
