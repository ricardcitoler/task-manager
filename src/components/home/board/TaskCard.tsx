import { Task } from '@/types/types';
import React, { FC } from 'react';
import clsx from 'clsx';

interface Props {
    task: Task;
}

// Mapeo de colores para Tailwind
const colorMap: Record<string, string> = {
    'red-300': 'bg-red-300 text-red-600',
    'blue-300': 'bg-blue-300 text-blue-600',
    'green-300': 'bg-green-300 text-green-600',
    'yellow-300': 'bg-yellow-300 text-yellow-600',
    'purple-300': 'bg-purple-300 text-purple-600',
    'orange-300': 'bg-orange-300 text-orange-600',
    'pink-300': 'bg-pink-300 text-pink-600',
    'teal-300': 'bg-teal-300 text-teal-600',
    'cyan-300': 'bg-cyan-300 text-cyan-600',
    'lime-300': 'bg-lime-300 text-lime-600',
};

const TaskCard: FC<Props> = ({ task }) => {

    return (
        <div className="space-y-2 bg-light-primary dark:bg-dark-primary rounded-xl p-2 max-w-[250px]">
            {task.image && <img className='rounded-lg w-full h-[70px] object-cover' src={task.image} alt={task.title} />}
            <p>{task.title}</p>
            {task.tags && (
                <div className="flex flex-wrap gap-2 items-center justify-start">
                    {task.tags.map((tag, index) => (
                        <div
                            key={index}
                            className={clsx(
                                'px-1 text-[10px] border rounded',
                                colorMap[tag.color] || 'bg-gray-300 text-gray-600' // Clase por defecto si el color no está en el mapa
                            )}
                        >
                            <p>{tag.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskCard;
