"use client";

import React, { FC, useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import SearchDrawer from "../search/SearchDrawer";
import { MdDeleteForever } from "react-icons/md";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { deleteBoardAction, setDetailBoardAction, setSearchDrawerAction } from "@/redux/actions/boards";
import { useBoards } from "@/redux/selector/board";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Tooltip } from "flowbite-react";
import useDebouncedValue from "@/hooks/use-debounce-value";

interface Props {
    className?: string;
}

const ActionButtons: FC<Props> = ({ className }) => {
    const dispatch: Dispatch<any> = useDispatch();
    const [deleteModal, setDeleteModal] = useState(false);
    const { detailBoard, boards, isSearchDrawerOpen } = useBoards();

    // Estado para manejar debounce
    const debouncedSearchDrawerOpen = useDebouncedValue(isSearchDrawerOpen, 300);

    const toggleDrawer = () => {
        const nextState = !isSearchDrawerOpen;
        dispatch(setSearchDrawerAction(nextState));
        console.log("Drawer toggled:", nextState);
    };

    const handleDeleteBoard = () => {
        if (detailBoard) {
            dispatch(deleteBoardAction(detailBoard.id));
            dispatch(setDetailBoardAction(boards[0]));
            setDeleteModal(false);
        }
    };

    const text = (
        <div>
            <p>Do you want to delete the Board: </p>
            <strong>`'${detailBoard?.title}'`</strong>
        </div>
    );

    return (
        <div className={`max-w-[70px] w-full flex h-full ${className}`}>
            <div className="space-y-5 flex w-full flex-col items-center justify-start">
                <span className="2xl:hidden">
                    <Tooltip content={debouncedSearchDrawerOpen ? "Close Searchbar" : "Open Searchbar"}>
                        <button
                            className="rounded-full flex items-center justify-center"
                            onClick={toggleDrawer}
                        >
                            <FcSearch className="w-10 h-10" />
                        </button>
                    </Tooltip>
                </span>

                <Tooltip content="Delete Actual Board">
                    <button onClick={() => setDeleteModal(true)}>
                        <MdDeleteForever className="w-10 h-10 text-red-600" />
                    </button>
                </Tooltip>
            </div>
            <ConfirmModal isOpen={deleteModal} action={handleDeleteBoard} text={text} onCancel={() => setDeleteModal(false)} />
            {debouncedSearchDrawerOpen && (
                <SearchDrawer onClose={toggleDrawer} isOpen={debouncedSearchDrawerOpen} />
            )}
        </div>
    );
};

export default ActionButtons;
