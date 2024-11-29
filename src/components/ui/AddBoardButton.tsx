import React, { FC } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

interface Props {
    onClick: () => void
}

const AddBoardButton: FC<Props> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className=" w-full bg-yellow-100 text-yellow-500 rounded-xl flex px-2 py-1 items-center justify-center gap-2"
        >
            <FaCirclePlus className="h-5 w-5 md:w-4 md:h-4" />
            <strong className="text-[14px] hidden md:block truncate">Add new board</strong>
        </button>
    )
}

export default AddBoardButton