import { BlueBase, BlueBaseContext } from '@bluebase/core';
// tslint:disable-next-line:sort-imports
import { Router as DefaultRouter, MemoryRouter, StaticRouter } from '../../lib/index';

import { InternalNavigator } from '../InternalNavigator';
import { NavigationProps } from '@bluebase/components';
import React from 'react';
import { preparePaths } from './preparePaths';

export type RouterType = 'static' | 'memory' | 'default';

/**
 * Navigation
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export class Navigation extends React.Component<NavigationProps> {
	static contextType = BlueBaseContext;

	render() {
		const { navigator, screenProps, ...rest } = this.props;
		const BB: BlueBase = this.context;

		// Make sure paths are in correct format.
		const navigatorObject = preparePaths(navigator);

		// Save the resolved tree in configs to use later
		BB.Configs.setValue('plugin.react-router.navigationConfigs', navigatorObject);

		const routerType: RouterType = BB.Configs.getValue('plugin-react-router.routerType');
		const routerProps = BB.Configs.getValue('plugin-react-router.routerProps');

		let Router = DefaultRouter;

		if (routerType === 'memory') {
			Router = MemoryRouter;
		} else if (routerType === 'static') {
			Router = StaticRouter;
		} else {
			Router = DefaultRouter;
		}

		return (
			<Router {...rest} {...routerProps}>
				<InternalNavigator navigator={navigatorObject} />
			</Router>
		);
	}
}
