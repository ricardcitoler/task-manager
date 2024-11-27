import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import CreateTaskModal from '../modals/CreateTaskModal';


const AddTaskButton = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button onClick={() => setOpenModal(true)} className='py-2 px-3 w-full bg-blue-100 text-blue-500 flex flex-row items-center justify-between rounded-xl'>
                <strong className='text-[14px]'>Add new task card</strong><FaPlus className='text-[18px]' />
            </button>
            {openModal && <CreateTaskModal isOpen={openModal} onClose={() => setOpenModal(false)} />}
        </>

    )
}

export default AddTaskButton