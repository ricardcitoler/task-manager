"use client"
import { setBoardsAction } from "@/redux/actions/boards";
import { Board } from "@/types/types";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface Props {
    initialBoards: Board[];
    children: React.ReactNode;
}
const HomeLayout: FC<Props> = ({ initialBoards, children }) => {
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(setBoardsAction(initialBoards));
    }, []);

    return <>{children}</>;
};

export default HomeLayout;
