import { useBoards } from '@/redux/selector/board';
import React, { FC } from 'react'

interface Props {
    className?: string;
}

const Dashboard: FC<Props> = ({ className }) => {

    const { detailBoard } = useBoards()

    return (
        <div className={`bg-light-secondary dark:bg-dark-secondary rounded-xl ${className}`}>
            <div></div>
        </div>
    )
}

export default Dashboard