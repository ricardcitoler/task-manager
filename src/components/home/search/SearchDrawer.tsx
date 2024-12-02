"use client";

import React, { FC, useEffect } from "react";
import Search from "./Search";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SearchDrawer: FC<Props> = ({ isOpen, onClose }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Manejar el cierre con la tecla "Escape"
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                } bg-black bg-opacity-50`}
            onClick={handleOverlayClick}
        >
            <div
                className={`fixed top-0 right-0 h-full w-[30vw] pt-3 border-dark-primary border-l-2 border-y-2 rounded-l-xl bg-light-secondary dark:bg-dark-secondary transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <Search isDrawer={true} />
            </div>
        </div>
    );
};

export default SearchDrawer;
