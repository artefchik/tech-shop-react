import { useCallback, useState } from 'react';

export function useToggleModal() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onShowModal = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    return {
        isOpenModal,
        onShowModal,
        onCloseModal,
    };
}
