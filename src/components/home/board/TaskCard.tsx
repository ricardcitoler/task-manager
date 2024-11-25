import { Task } from '@/types/types';
import React, { FC } from 'react'

interface Props {
    task: Task;
}

const TaskCard: FC<Props> = ({ task }) => {
    return (
        <div className='bg-light-primary dark:bg-dark-primary rounded-xl p-2'>
            <img src={task.image}></img>
            <p>{task.title}</p>
            {task.tags && <div className='flex flex-row gap-2 items-center justify-start'>
                {task.tags.map((tag, index) => (
                    <div className={`px-2 py-1 bg-${tag.color}-200 `}>
                        <p className={`text-${tag.color}-600`}>{task.title}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default TaskCard