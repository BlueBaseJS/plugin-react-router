import {
	BlueBase,
	BlueBaseContext,
	Redirect,
	getComponent,
} from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Route, Switch } from '../../lib/index';
import React from 'react';
import { ScreenProps } from '../../components';
import { historyToActionObject } from '../../helpers/historyToActionObject';
import { renderNavigator } from '../../helpers/renderNavigator';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';

const DrawerView = getComponent('DrawerView');

export interface DrawerNavigatorProps extends NavigatorPropsWithResolvedRoutes {
}

export class DrawerNavigator extends React.Component<DrawerNavigatorProps> {

	static contextType = BlueBaseContext;

	public render() {

		const BB: BlueBase = this.context;
		const { type, routes, initialRouteName, ...rest } = this.props;

		if (routes.length === 0) {
			return null;
		}

		const initialRoute = initialRouteName || routes[0].name;

		return (
			<Switch {...rest}>
				{routes.map(route => this.renderRoute(route, BB))}
				{!!initialRoute ? <Redirect routeName={initialRoute} /> : null}
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
		const Component = (typeof screen === 'string') ? getComponent(screen) : screen;

		const screenProps: Partial<ScreenProps> = {
			component: Component,
			navigationOptions,
			navigator: parentNavigator,
		};

		if (navigator) {
			screenProps.children = renderNavigator(navigator as any, BB);
		}

		return (
			<Route {...routeProps}>
				{(routerProps: RouteChildrenProps) => (
					<DrawerView
						{...screenProps}
						navigation={historyToActionObject(routerProps as RouteComponentProps, BB)}
					/>
				)}
			</Route>
		);
	}
}