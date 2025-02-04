"use client"
import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Dashboard from './board/Dashboard';
import CreateBoardModal from '../modals/CreateBoardModal';
import Search from './search/Search';
import ActionButtons from './actions/ActionButtons';

const HomePage = () => {
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

    return (
        <div className='w-full h-screen flex p-4 gap-4'>
            <Sidebar isCreateBoardModalOpen={isCreateBoardModalOpen} setIsCreateBoardModalOpen={setIsCreateBoardModalOpen} className="w-[20%] lg:w-[17%] xl:min-w-[250px] h-full" />
            <Dashboard className="h-full w-full 2xl:min-w-[1200px] " />
            <Search className="2xl:max-w-[300px] hidden 2xl:block" />
            <ActionButtons />
            {<CreateBoardModal isOpen={isCreateBoardModalOpen} onClose={() => setIsCreateBoardModalOpen(false)} />}
        </div>
    )
}

export default HomePage