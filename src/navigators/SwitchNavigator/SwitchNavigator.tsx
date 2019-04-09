import {
	BlueBase,
	BlueBaseContext,
	Noop,
	getComponent,
} from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Route, Switch } from '../../lib';
import React from 'react';
import { ScreenProps } from '../../components';
import { historyToActionObject } from '../../helpers/historyToActionObject';
import { renderNavigator } from '../../helpers/renderNavigator';

export interface SwitchNavigatorProps extends NavigatorPropsWithResolvedRoutes {
}

export class SwitchNavigator extends React.Component<SwitchNavigatorProps> {

	static contextType = BlueBaseContext;

	public render() {

		const BB: BlueBase = this.context;
		const { type, routes, initialRouteName, ...rest } = this.props;

		if (routes.length === 0) {
			return null;
		}

		return (
			<Switch {...rest}>
				{routes.map(route => this.renderRoute(route, BB))}
			</Switch>
		);
	}

	private renderRoute(route: RouteConfigWithResolveSubRoutes, BB: BlueBase) {

		const parentNavigator = this.props;
		const { exact, name, navigationOptions, navigator, path, screen } = route;

		// react-router's route object
		const routeProps: any = {
			exact,
			key: name,
			path,
		};

		// Screen component
		const Component = screen
		? (typeof screen === 'string') ? getComponent(screen) : screen
		: Noop;

		const screenProps: Partial<ScreenProps> = {
			navigationOptions,
			navigator: parentNavigator,
		};

		if (navigator) {
			screenProps.children = renderNavigator(navigator as any, BB);
		}

		return (
			<Route {...routeProps}>
				{(routerProps) => (
					<Component
						{...screenProps}
						navigation={historyToActionObject(routerProps, BB)}
					/>
				)}
			</Route>
		);
	}
}