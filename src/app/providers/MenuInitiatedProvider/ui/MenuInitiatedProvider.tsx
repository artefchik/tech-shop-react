import React, {
    FC, ReactNode, useMemo, useState,
} from 'react';
import { MenuInitiatedContext } from '../lib/MenuInitiatedContext';

interface MenuInitiatedProviderProps {
  children?:ReactNode
}

const MenuInitiatedProvider = (props:MenuInitiatedProviderProps) => {
    const { children } = props;
    const [isMenuInitiated, setIsMenuInitiated] = useState<boolean>(false);

    const defaultProps = useMemo(() => ({
        isMenuInitiated,
        setIsMenuInitiated,
    }), [isMenuInitiated]);

    return (
        <MenuInitiatedContext.Provider value={defaultProps}>
            {children}
        </MenuInitiatedContext.Provider>
    );
};

export default MenuInitiatedProvider;
