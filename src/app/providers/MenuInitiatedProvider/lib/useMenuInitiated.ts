import { useContext, useState } from 'react';
import { MenuInitiatedContext } from 'app/providers/MenuInitiatedProvider/lib/MenuInitiatedContext';

export interface UseMenuInitiatedResult {
  isMenuInitiated:boolean;
  menuToggle:()=>void
}

export function useMenuInitiated():UseMenuInitiatedResult {
    const { isMenuInitiated, setIsMenuInitiated } = useContext(MenuInitiatedContext);
    const menuToggle = () => {
        setIsMenuInitiated?.(!isMenuInitiated);
    };

    return {
        isMenuInitiated: isMenuInitiated || false,
        menuToggle,
    };
}
