import { BlueBase, BlueBaseContext } from '@bluebase/core';

import { InternalNavigator } from '../InternalNavigator';
import { NavigationProps } from '@bluebase/components';
import React from 'react';
import { Router } from '../../lib/index';
import { preparePaths } from './preparePaths';

export function createNavigation(InputRouter: any = Router) {
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

			// Save the resolved tree in configs to use later
			BB.Configs.setValue('plugin.react-router.navigationConfigs', navigatorObject);

			const routerProps = BB.Configs.getValue('plugin.react-router.router-props');

			return (
				<InputRouter {...rest} {...routerProps}>
					<InternalNavigator navigator={navigatorObject} />
				</InputRouter>
			);
		}
	};
}