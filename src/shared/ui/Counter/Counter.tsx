import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Counter.module.scss';

export enum ViewCounter {
    BIG = 'big',
    SMALL = 'small',
}

interface CounterProps {
    className?: string;
    quantity: number;
    onIncrement?: (quantity: number) => void;
    onDecrement?: (quantity: number) => void;
    stopPropagation?: boolean;
    view?: ViewCounter;
}

export const Counter = memo((props: CounterProps) => {
    const {
        className,
        quantity,
        onDecrement,
        onIncrement,
        stopPropagation = false,
        view = ViewCounter.SMALL,
    } = props;

    const onDecrementHandler = (quantity: number) => () => {
        onDecrement?.(quantity);
    };
    const onIncrementHandler = (quantity: number) => () => {
        onIncrement?.(quantity);
    };

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (stopPropagation) {
            e.stopPropagation();
        }
    };

    return (
        <div
            onClick={onClickHandler}
            className={classNames(cls.Counter, {}, [className, cls[view]])}
        >
            <div className={cls.body}>
                <button
                    onClick={onDecrementHandler(quantity)}
                    type="button"
                    className={cls.button}
                />
                <div className={cls.quantity}>{quantity}</div>
                <button
                    onClick={onIncrementHandler(quantity)}
                    type="button"
                    className={classNames(cls.button, {}, [cls.increment])}
                />
            </div>
        </div>
    );
});
