import React, {
    FC, MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from '../../lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

interface KeyboardEvent {
    key: string;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();

    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);
    const onContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div
                        className={classNames(cls.content, mods, [className])}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
