import { NavigatorProps } from '@bluebase/components';
import { createContext } from 'react';

export const MainNavigatorContext = createContext<NavigatorProps>({ routes: [] });

export const MainNavigatorContextProvider = MainNavigatorContext.Provider;
