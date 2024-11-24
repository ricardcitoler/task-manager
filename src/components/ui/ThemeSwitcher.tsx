"use client"
import { useEffect, useState } from "react";
import { PiMoonLight } from "react-icons/pi";
import { MdLightMode } from "react-icons/md";
const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className="w-full p-1 flex flex-row justify-between bg-light-secondary dark:bg-dark-secondary gap-1 rounded-xl">
            <button
                onClick={() => setIsDarkMode(true)}
                className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center w-full px-2 py-1 bg-light-secondary dark:bg-dark-primary text-black dark:text-white rounded-lg"
            >
                <PiMoonLight />
                <p className="hidden xl:block">Dark</p> {/* Oculto en pantallas más pequeñas que md */}
            </button>
            <button
                onClick={() => setIsDarkMode(false)}
                className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center w-full px-2 py-1 bg-light-primary dark:bg-dark-secondary text-black dark:text-white rounded-lg"
            >
                <MdLightMode />
                <p className="hidden xl:block">Light</p> {/* Oculto en pantallas más pequeñas que md */}
            </button>

        </div>

    );
};

export default ThemeSwitcher;
