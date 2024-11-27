"use client"
import React, { FC } from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { imageURLs } from '../../../mocs/generator';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { addBoardAction } from '@/redux/actions/boards';
import { createBoardSchema } from '@/validators/schemas';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';


// Tipo inferido para los datos del formulario
type CreateBoardFormData = z.infer<typeof createBoardSchema>;

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

const CreateBoardModal: FC<Props> = ({ onClose, isOpen }) => {
    const dispatch: Dispatch<any> = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateBoardFormData>({
        resolver: zodResolver(createBoardSchema),
    });

    const selectedLogo = watch("logo");

    if (!isOpen) return null;
    const onSubmit = (data: CreateBoardFormData) => {
        dispatch(addBoardAction(data))
        onClose()
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[400px] bg-border-gradient p-1 rounded-xl"
            >
                <div className="relative h-[335px] flex flex-col w-full bg-dark-secondary space-y-3 p-3 rounded-lg text-white">
                    <h1 className="mb-5">New Board!</h1>

                    {/* Campo de título */}
                    <label className="block text-[12px] text-gray-400">Board Name</label>
                    <input
                        {...register("title")}
                        placeholder="e.g. Default Board"
                        type="text"
                        className="outline-none bg-transparent border rounded-lg px-2 py-1 border-gray-400"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title.message}</p>
                    )}

                    {/* Campo para selección de logo */}
                    <p className="text-[12px] text-gray-400">Logos</p>
                    <div className="flex flex-wrap gap-2">
                        {imageURLs.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setValue("logo", img)}
                                className={`rounded-full cursor-pointer border-2 ${selectedLogo === img ? "border-blue-500" : "border-gray-500"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Logo ${index}`}
                                    width={50}
                                    height={50}
                                    className="rounded-full w-10 h-10"
                                />
                            </div>
                        ))}
                    </div>
                    {errors.logo && (
                        <p className="text-red-500 text-xs">{errors.logo.message}</p>
                    )}
                    <div className="w-full flex items-center justify-start gap-2">
                        <button
                            type="submit"
                            className="flex flex-row bg-blue-600 py-1 px-4 items-center gap-2 rounded-full"
                        >
                            <p className="font-sem">Create Board</p>
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
                        <IoMdClose />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBoardModal;