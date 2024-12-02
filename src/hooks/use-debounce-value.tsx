import { useState, useEffect } from "react";

/**
 * Hook para manejar el debounce de un valor
 * @param value Valor a debouncing
 * @param delay Tiempo de espera en milisegundos
 */
const useDebouncedValue = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebouncedValue;
