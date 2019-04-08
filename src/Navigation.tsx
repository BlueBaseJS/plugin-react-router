import {
	BlueBase,
	BlueBaseContext,
	NavigationProps,
} from '@bluebase/core';
import React from 'react';
import { Router } from './lib/index';
import { preparePaths } from './helpers/preparePaths';
import { renderNavigator } from './helpers/renderNavigator';

export class Navigation extends React.Component<NavigationProps> {

	static contextType = BlueBaseContext;

	render() {

		const { navigator, ...rest } = this.props;
		const BB: BlueBase = this.context;
		console.log(BB)

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