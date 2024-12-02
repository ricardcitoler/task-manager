import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import CreateTaskModal from '../modals/CreateTaskModal';


const AddTaskButton = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button onClick={() => setOpenModal(true)} className='py-1 gap-2 px-3 w-full bg-blue-100 text-blue-500 flex flex-row items-center justify-center rounded-xl'>
                <FaCirclePlus className="h-5 w-5 md:w-4 md:h-4" /><strong className='text-[14px] hidden md:block truncate'>Add new task</strong>
            </button>
            {openModal && <CreateTaskModal isOpen={openModal} onClose={() => setOpenModal(false)} />}
        </>

    )
}

export default AddTaskButton