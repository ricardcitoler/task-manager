"use client"
import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import { boardsGenerator } from '../../../utils/generator';
import Dashboard from './board/Dashboard';
import CreateBoardModal from '../modals/CreateBoardModal';

const HomePage = () => {
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(true);

    return (
        <div className='w-full h-screen flex p-4 gap-4'>
            <Sidebar isCreateBoardModalOpen={isCreateBoardModalOpen} setIsCreateBoardModalOpen={setIsCreateBoardModalOpen} className="w-[20%] lg:w-[17%] xl:w-[14%] h-full" />
            <Dashboard className="w-full h-full" />
            {<CreateBoardModal isOpen={isCreateBoardModalOpen} onClose={() => setIsCreateBoardModalOpen(false)} />}
        </div>
    )
}

export default HomePage