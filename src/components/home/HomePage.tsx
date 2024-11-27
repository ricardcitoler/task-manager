"use client"
import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Dashboard from './board/Dashboard';
import CreateBoardModal from '../modals/CreateBoardModal';
import Search from './search/Search';

const HomePage = () => {
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

    return (
        <div className='w-full h-screen flex p-4 gap-4'>
            <Sidebar isCreateBoardModalOpen={isCreateBoardModalOpen} setIsCreateBoardModalOpen={setIsCreateBoardModalOpen} className="w-[20%] lg:w-[17%] xl:w-[14%] h-full" />
            <Dashboard className="h-full" />
            <Search className='w-full max-w-[650px]' />
            {<CreateBoardModal isOpen={isCreateBoardModalOpen} onClose={() => setIsCreateBoardModalOpen(false)} />}
        </div>
    )
}

export default HomePage