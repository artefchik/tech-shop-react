import { useEffect, useMemo, useState } from 'react';

type UseLocalStorageResult<T> = [value: T, setValue: (newValue: T) => void];

export function useLocalStorage<T>(key: string, initialValue: T) {
    const getValue = () => {
        try {
            const value = localStorage.getItem(key);

            if (value) {
                return JSON.parse(value) as T;
            }

            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        } catch (error) {
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return useMemo<UseLocalStorageResult<T>>(
        () => [storedValue, setStoredValue],
        [storedValue],
    );
}
