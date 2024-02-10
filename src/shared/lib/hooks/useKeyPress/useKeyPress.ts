import { useEffect, useState } from 'react';

interface UseKeyPressProps {
    key: string;
    callback?: () => void;
}

export function useKeyPress(props: UseKeyPressProps) {
    const { key, callback } = props;

    const [keyPressed, setKeyPressed] = useState(false);

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === key) {
            setKeyPressed(true);
            callback?.();
        }
    };
    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === key) {
            setKeyPressed(false);
            callback?.();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    return keyPressed;
}
