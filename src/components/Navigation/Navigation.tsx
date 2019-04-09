import {
	BlueBase,
	BlueBaseContext,
} from '@bluebase/core';
import { NavigationProps } from '@bluebase/components';
import React from 'react';
import { Router } from '../../lib/index';
import { preparePaths } from './preparePaths';
import { renderNavigator } from '../../helpers/renderNavigator';

/**
 * Navigation
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export class Navigation extends React.Component<NavigationProps> {

	static contextType = BlueBaseContext;

	render() {

		const { navigator, ...rest } = this.props;
		const BB: BlueBase = this.context;

		// Make sure paths are in correct format.
		const navigatorObject = preparePaths(navigator);

		// Save the resolved tree in configs to use later
		BB.Configs.setValue('plugin.react-router.navigationConfigs', navigatorObject);

		return (
			<Router {...rest}>
				{renderNavigator(navigatorObject, BB)}
			</Router>
		);
	}
}