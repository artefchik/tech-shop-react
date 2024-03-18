import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorButtonProps {
    className?: string;
}

export const ErrorButton = ({ className }: ErrorButtonProps) => {
    const [isError, setIsError] = useState(0);

    const counter = () => {
        setIsError((prevState) => prevState + 1);
        if (isError === 4) {
            throw new Error('');
        }
    };

    // eslint-disable-next-line i18next/no-literal-string
    return <Button onClick={counter} className={className} />;
};
