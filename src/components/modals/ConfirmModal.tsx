"use client";

import React, { FC, useEffect, useRef } from "react";

interface Props {
    isOpen: boolean;
    action: () => void;
    onCancel: () => void;
    text: React.ReactNode;
}

const ConfirmModal: FC<Props> = ({ isOpen, action, onCancel, text }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Manejar el cierre con la tecla "Escape"
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onCancel();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            // Asegurar que el foco esté dentro del modal
            modalRef.current?.focus();
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onCancel]);

    // Evitar la interacción fuera del modal
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed h-screen inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={modalRef}
                        tabIndex={-1} // Permite que el modal sea enfocable
                        className="bg-border-gradient shadow-lg max-w-[400px] p-1 rounded-xl focus:outline-none"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-[400px] w-full p-6">
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    {text}
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        onClick={action}
                                    >
                                        {"Yes, I'm sure"}
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                                        onClick={onCancel}
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmModal;
