import { BlueBase, BlueBaseContext } from '@bluebase/core';
import { NavigationProps, NavigatorProps } from '@bluebase/components';
import React, { createContext } from 'react';

import { InternalNavigator } from '../InternalNavigator';
import { preparePaths } from '../../helpers';

export const MainNavigatorContext = createContext<NavigatorProps>({ routes: [] });

export function createNavigation(InputRouter: any) {
	/**
	 * Navigation
	 * This serves as an entry point where BlueBase passes routes and navigation
	 * configs to this component.
	 */
	return class Navigation extends React.Component<NavigationProps> {
		static contextType = BlueBaseContext;

		render() {
			const { navigator, screenProps, ...rest } = this.props;
			const BB: BlueBase = this.context;

			// Make sure paths are in correct format.
			const navigatorObject = preparePaths(navigator);

			const routerProps = BB.Configs.getValue('plugin.react-router.router-props');

			return (
				<MainNavigatorContext.Provider value={navigatorObject}>
					<InputRouter {...rest} {...routerProps}>
						<InternalNavigator navigator={navigatorObject} />
					</InputRouter>
				</MainNavigatorContext.Provider>
			);
		}
	};
}
