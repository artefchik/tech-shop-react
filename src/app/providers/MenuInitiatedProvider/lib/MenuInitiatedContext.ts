import { createContext } from 'react';

export interface MenuInitiatedContextProps {
  isMenuInitiated?:boolean ;
  setIsMenuInitiated?: (isMenuInitiated:boolean) => void;
}

export const MenuInitiatedContext = createContext<MenuInitiatedContextProps>({});
