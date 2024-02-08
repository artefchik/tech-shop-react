import { useEffect, useState } from 'react';

export function useKeyPress(key: string) {
    const [keyPressed, setKeyPressed] = useState(false);

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === key) setKeyPressed(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === key) setKeyPressed(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keydown', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keydown', onKeyUp);
        };
    }, []);

    return keyPressed;
}
