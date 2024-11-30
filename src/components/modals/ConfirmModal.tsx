import React, { FC } from "react";
import { Modal } from "flowbite-react";

interface Props {
    isOpen: boolean;
    action: () => void;
    onCancel: () => void;
    text: React.ReactNode;
}

const ConfirmModal: FC<Props> = ({ isOpen, action, onCancel, text }) => {
    return (
        <div
            className={`fixed h-screen inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? "visible opacity-100" : "invisible opacity-0"
                } transition-opacity duration-300`}
        >
            <div className="bg-border-gradient shadow-lg max-w-[400px] p-1 rounded-xl">
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
    );
};

export default ConfirmModal;
