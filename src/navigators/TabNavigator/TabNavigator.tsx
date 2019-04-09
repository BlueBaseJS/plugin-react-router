import {
	BlueBase,
	BlueBaseContext,
	getComponent,
} from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Route, Switch } from '../../lib';
import React from 'react';
import { historyToActionObject } from '../../helpers/historyToActionObject';
import { renderNavigator } from '../../helpers/renderNavigator';
import { Redirect } from '@bluebase/components';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';

const TabView = getComponent('TabView');

export interface TabNavigatorProps extends NavigatorPropsWithResolvedRoutes {
}

export class TabNavigator extends React.Component<TabNavigatorProps> {

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
				{!!initialRoute ? <Redirect routeName={initialRoute} />: null}
			</Switch>
		);
	}

	private renderRoute(route: RouteConfigWithResolveSubRoutes, BB: BlueBase) {

		const parentNavigator = this.props as TabNavigatorProps;
		const { exact, name, navigationOptions, navigator, path, screen } = route;

		// react-router's route object
		const routeProps: any = {
			exact,
			key: name,
			path,
		};

		// Screen component
		const Component = (typeof screen === 'string') ? getComponent(screen) : screen;

		const screenProps: any = {
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
					<TabView
						{...screenProps}
						navigation={historyToActionObject(routerProps as RouteComponentProps, BB)}
					/>
				)}
			</Route>
		);
	}
}