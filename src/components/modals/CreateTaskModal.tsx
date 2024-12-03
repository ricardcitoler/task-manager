"use client"
import React, { FC, useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { generateRandomTags } from '../../../mocs/generator';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskToBoardAction } from '@/redux/actions/boards';
import { createTaskSchema } from '@/validators/schemas';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { GoDotFill } from "react-icons/go";
import { useBoards } from '@/redux/selector/board';
import clsx from 'clsx';
import { Tags } from '@/types/types';
import Image from 'next/image';



// Tipo inferido para los datos del formulario
type CreateBoardFormData = z.infer<typeof createTaskSchema>;

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

const colorMap: Record<string, string> = {
    "red-100": "bg-red-100 text-red-600",
    "blue-100": "bg-blue-100 text-blue-600",
    "green-100": "bg-green-100 text-green-600",
    "yellow-100": "bg-yellow-100 text-yellow-600",
    "purple-100": "bg-purple-100 text-purple-600",
    "orange-100": "bg-orange-100 text-orange-600",
    "pink-100": "bg-pink-100 text-pink-600",
    "teal-100": "bg-teal-100 text-teal-600",
    "cyan-100": "bg-cyan-100 text-cyan-600",
    "lime-100": "bg-lime-100 text-lime-600",
};



const CreateTaskModal: FC<Props> = ({ onClose, isOpen }) => {
    const dispatch: Dispatch<any> = useDispatch();
    const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
    const { detailBoard } = useBoards()
    const [tags, setTags] = useState<Tags[]>([]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateBoardFormData>({
        resolver: zodResolver(createTaskSchema),
    });

    const selectedImage = watch("image");
    const onSubmit = (data: CreateBoardFormData) => {
        if (detailBoard) {
            console.log(data)
            dispatch(addTaskToBoardAction(detailBoard.id, data));
        }
        reset();
        onClose();
    };

    const toggleTagSelection = (tag: Tags) => {
        setSelectedTags((prevTags) => {
            let updatedTags;

            if (prevTags.some((t) => t.id === tag.id)) {
                updatedTags = prevTags.filter((t) => t.id !== tag.id);
            } else if (prevTags.length >= 4) {
                updatedTags = [...prevTags.slice(1), tag];
            } else {
                updatedTags = [...prevTags, tag];
            }
            setValue("tags", updatedTags);
            return updatedTags;
        });
    };


    useEffect(() => {
        setTags(generateRandomTags(20));
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTags(generateRandomTags(20));
        }
    }, [isOpen]);

    return (
        <div onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[400px] bg-border-gradient p-1 rounded-xl"
            >
                <div className="relative h-[full] flex flex-col w-full bg-light-secondary dark:bg-dark-secondary space-y-3 p-3 rounded-lg">
                    <h1 className="mb-3">Task details</h1>
                    <div className='space-y-2'>
                        <label className="block text-[12px] text-gray-400">Select Image</label>
                        {selectedImage && (
                            <div className="mt-3">
                                <Image
                                    src={selectedImage}
                                    alt="Selected preview"
                                    className="w-full rounded-md object-cover h-[150px]"
                                    width={10}
                                    height={10}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setValue("image", event.target?.result as string); // Guardar la URL base64 de la imagen
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />

                    </div>

                    <label className="block text-[12px] text-gray-400">Task name</label>
                    <input
                        {...register("title")}
                        placeholder="e.g. Default Board"
                        type="text"
                        className="outline-none bg-transparent border rounded-lg px-2 py-1 border-gray-400"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title.message}</p>
                    )}
                    <label className="block text-[12px] text-gray-400">Status</label>
                    <div className="w-full flex flex-row items-center justify-between px-5 gap-3">
                        <button
                            type="button"
                            className={`flex flex-col border rounded-md w-full items-center justify-center transition-transform duration-200 transform hover:scale-110 ${watch("status") === "BACKLOG" ? "scale-110 bg-orange-100 text-black" : ""
                                }`}
                            onClick={() => setValue("status", "BACKLOG")}
                        >
                            <GoDotFill className=" text-[30px] text-orange-600" />
                            <p className="text-[12px]">Backlog</p>
                        </button>
                        <button
                            type="button"
                            className={`flex flex-col border rounded-md w-full  items-center justify-center transition-transform duration-200 transform hover:scale-110 ${watch("status") === "IN_PROGRESS" ? "scale-110 bg-yellow-100 text-black" : ""
                                }`}
                            onClick={() => setValue("status", "IN_PROGRESS")}
                        >
                            <GoDotFill className="text-yellow-600 text-[30px]" />
                            <p className="text-[12px]">In Progress</p>
                        </button>
                        <button
                            type="button"
                            className={`flex flex-col border rounded-md w-full  items-center justify-center transition-transform duration-200 transform hover:scale-110 ${watch("status") === "IN_REVIEW" ? "scale-110 bg-green-100 text-black" : ""
                                }`}
                            onClick={() => setValue("status", "IN_REVIEW")}
                        >
                            <GoDotFill className="text-green-600 text-[30px]" />
                            <p className="text-[12px]">In Review</p>
                        </button>
                        <button
                            type="button"
                            className={`flex flex-col border rounded-md w-full  items-center justify-center transition-transform duration-200 transform hover:scale-110 ${watch("status") === "COMPLETED" ? "scale-110 bg-indigo-100 text-black" : ""
                                }`}
                            onClick={() => setValue("status", "COMPLETED")}
                        >
                            <GoDotFill className="text-indigo-600 text-[30px]" />
                            <p className="text-[12px]">Completed</p>
                        </button>
                    </div>


                    <div className='space-y-2'>
                        <label className="block text-[12px] text-gray-400">Selected Tags</label>
                        <div className="flex flex-wrap gap-2 items-center justify-center border p-3 rounded-lg">
                            {selectedTags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className={clsx(
                                        "px-1 text-[10px] border rounded",
                                        colorMap[tag.color] || "bg-gray-100 text-gray-600" // Clase según el color del tag o predeterminada
                                    )}
                                >
                                    <p>{tag.name}</p>
                                </div>
                            ))}


                        </div>
                    </div>

                    {tags && (
                        <div className="flex flex-wrap gap-2 items-center justify-center">
                            {tags.map((tag, index) => (
                                <button
                                    type='button'
                                    onClick={() => toggleTagSelection(tag)} // Pasar el objeto completo
                                    key={index}
                                    className={clsx(
                                        "px-1 text-[10px] border rounded",
                                        selectedTags.some((t) => t.id === tag.id)
                                            ? "bg-gray-300 text-black" // Clase activa
                                            : colorMap[tag.color] || "bg-gray-100 text-gray-600" // Clase inactiva
                                    )}
                                >
                                    <p>{tag.name}</p>
                                </button>
                            ))}

                        </div>
                    )}

                    <div className="w-full flex items-center justify-start gap-2">
                        <button
                            type="submit"
                            className="flex flex-row bg-blue-600 py-1 px-4 items-center gap-2 rounded-full"
                        >
                            <p className="font-sem">Save</p>
                            <FaCheck />
                        </button>
                        <button
                            type="button"
                            className="py-1 px-4 border-2 font-semibold border-gray-400 rounded-full text-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-0 right-3"
                    >
                        <IoMdClose onClick={onClose} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTaskModal;