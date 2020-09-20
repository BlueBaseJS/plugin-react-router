import { NavigatorProps } from '@bluebase/components';
import { createContext } from 'react';

export interface MainNavigatorContextData {
	// navigator with prepare paths
	navigator: NavigatorProps;

	// navigator without prepare paths
	rawNavigator: NavigatorProps;
}

export const MainNavigatorContext = createContext<MainNavigatorContextData>({
	navigator: { routes: [] },
	rawNavigator: { routes: [] },
});
