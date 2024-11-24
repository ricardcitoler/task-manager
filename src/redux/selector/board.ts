import { useSelector } from "react-redux";
import { RootState } from "../reducers";

/**
 * Custom hook to select the tasks state from the global Redux state.
 * @returns The tasks state from the Redux store.
 */
export const useBoards = () => useSelector((state: RootState) => state.boards);
