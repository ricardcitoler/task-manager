import React, { FC, useState } from "react";
import { FcSearch } from "react-icons/fc";
import SearchDrawer from "../search/SearchDrawer";
import { MdDeleteForever } from "react-icons/md";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { deleteBoardAction, setDetailBoardAction } from "@/redux/actions/boards";
import { useBoards } from "@/redux/selector/board";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Tooltip } from "flowbite-react";
interface Props {
    hideDrawer?: boolean
    className?: string
}

const ActionButton: FC<Props> = ({ hideDrawer, className }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const [deleteModal, setDeleteModal] = useState(false);

    const { detailBoard, boards } = useBoards()


    const handleDeleteBoard = () => {
        if (detailBoard) {
            dispatch(deleteBoardAction(detailBoard.id))
            dispatch(setDetailBoardAction(boards[0]))
            setDeleteModal(false)
        }
    };

    const text =
        <div>
            <p>Do you want to delete the Board: </p>
            <strong>{`'${detailBoard?.title}'`}</strong>

        </div>

    return (
        <div className={`max-w-[70px] w-full flex h-full  ${className}`}>
            <div className="space-y-5 flex w-full flex-col items-center justify-start ">
                {hideDrawer &&
                    <Tooltip content="Open Searchbar">
                        <button
                            className="rounded-full flex items-center justify-center"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <FcSearch className="w-10 h-10" />
                        </button>
                    </Tooltip>
                }
                <Tooltip content="Delete Actual Board">
                    <button onClick={() => setDeleteModal(true)}>
                        <MdDeleteForever className="w-10 h-10 text-red-600" />
                    </button>
                </Tooltip>

            </div>
            <ConfirmModal isOpen={deleteModal} action={handleDeleteBoard} text={text} onCancel={() => setDeleteModal(false)} />
            {isDrawerOpen && (
                <SearchDrawer
                    onClose={() => setIsDrawerOpen(false)}
                    isOpen={isDrawerOpen}
                />
            )}
        </div>
    );
};

export default ActionButton;
