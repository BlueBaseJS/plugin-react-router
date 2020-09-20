import { useComponent, useConfig } from '@bluebase/core';

import { MainNavigatorContextProvider } from '../MainNavigatorContext';
import { NavigationProps } from '@bluebase/components';
import React from 'react';
import { preparePaths } from '../../helpers';

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

	const navigatorObject = preparePaths(navigator);

	return (
		<MainNavigatorContextProvider value={navigatorObject}>
			<Router {...rest} {...routerProps}>
				<Navigator {...navigatorObject} standalone={false} />
			</Router>
		</MainNavigatorContextProvider>
	);
};
