import { NavigationProps, NavigatorProps } from '@bluebase/components';
import React, { createContext } from 'react';
import { useComponent, useConfig } from '@bluebase/core';

import { preparePaths } from '../../helpers';

export const MainNavigatorContext = createContext<NavigatorProps>({ routes: [] });

export interface RRNavigationProps extends NavigationProps {}

/**
 * Navigation
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: RRNavigationProps) => {
	const { Router, navigator, ...rest } = props;

	const Navigator = useComponent('Navigator');
	const [routerProps] = useConfig('plugin.react-router.router-props');

	// Make sure paths are in correct format.
	const navigatorObject = preparePaths(navigator);

	return (
		<MainNavigatorContext.Provider value={navigatorObject}>
			<Router {...rest} {...routerProps}>
				<Navigator navigator={navigatorObject} />
			</Router>
		</MainNavigatorContext.Provider>
	);
};
