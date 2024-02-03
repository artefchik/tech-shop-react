import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Counter.module.scss';

interface CounterProps {
    className?: string;
    quantity: number;
    onIncrement?: (quantity: number) => void;
    onDecrement?: (quantity: number) => void;
}

export const Counter = memo((props: CounterProps) => {
    const { className, quantity, onDecrement, onIncrement } = props;

    const onDecrementHandler = (quantity: number) => () => {
        onDecrement?.(quantity);
    };
    const onIncrementHandler = (quantity: number) => () => {
        onIncrement?.(quantity);
    };

    return (
        <div className={classNames(cls.Counter, {}, [className])}>
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
