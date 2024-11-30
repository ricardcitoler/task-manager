import React, { FC } from "react";
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

    return (
        <div
            className={`fixed inset-0 z-[9999]  bg-opacity-50 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } transition-opacity duration-300`}
            onClick={handleOverlayClick}
        >
            <div
                className={`fixed top-0 right-0 h-full w-[30vw] pt-3 border-dark-primary border-l-2 border-y-2 rounded-l-xl bg-light-secondary dark:bg-dark-secondary transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <Search isDrawer={true} />
            </div>
        </div>
    );
};

export default SearchDrawer;
