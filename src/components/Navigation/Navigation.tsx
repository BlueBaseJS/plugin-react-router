import { useComponent, useConfig } from '@bluebase/core';

import { MainNavigatorContext } from '../MainNavigatorContext';
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
	const { Router, navigator: rawNavigator, ...rest } = props;

	const Navigator = useComponent('Navigator');
	const [routerProps] = useConfig('plugin.react-router.router-props');

	const navigatorObject = preparePaths(rawNavigator);

	return (
		<MainNavigatorContext.Provider value={{ navigator: navigatorObject, rawNavigator }}>
			<Router {...rest} {...routerProps}>
				<Navigator {...navigatorObject} standalone={false} />
			</Router>
		</MainNavigatorContext.Provider>
	);
};
