import { VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sandboxSettingsActions } from '../../model/slice/sandboxSettingsSlice';

interface SandboxSettingsKeyWordsProps {
    className?: string;
}

export const SandboxSettingsKeyWords = (props: SandboxSettingsKeyWordsProps) => {
    const { className } = props;
    const [keyWord, setKeyWord] = useState('');
    const dispatch = useAppDispatch();

    const setKeyWordsHandler = useCallback(() => {
        dispatch(sandboxSettingsActions.setKeyWords(keyWord));
    }, [dispatch, keyWord]);

    const debounceSetKeyWords = useDebounce(setKeyWordsHandler, 800);

    useEffect(() => {
        debounceSetKeyWords();
    }, [debounceSetKeyWords]);

    const onChangeKeyWords = useCallback((value: string) => {
        setKeyWord(value);
    }, []);

    return (
        <VStack gap="10" className={className}>
            <Text title="Ключевые слова" />
            <Input
                theme={InputTheme.SECONDARY}
                value={keyWord}
                onChange={onChangeKeyWords}
                placeholder="Введите ключевые слова"
            />
            <Text
                text="Введите  от 1 до 8 ключевых слов, отделяя их запятыми"
                theme={TextTheme.SMALL}
            />
        </VStack>
    );
};
