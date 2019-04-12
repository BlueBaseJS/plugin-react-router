import { BlueBase, BlueBaseContext, getComponent } from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Route, Switch } from '../../lib/index';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';
import React from 'react';
import { Redirect } from '@bluebase/components';
import { historyToActionObject } from '../../helpers/historyToActionObject';
import { renderNavigator } from '../../helpers/renderNavigator';

const DrawerView = getComponent('DrawerView');

export interface DrawerNavigatorProps extends NavigatorPropsWithResolvedRoutes {
}

export interface DrawerNavigatorState {
	routes: RouteConfigWithResolveSubRoutes[];
}

export class DrawerNavigator extends React.Component<DrawerNavigatorProps> {

	static contextType = BlueBaseContext;

	readonly state: DrawerNavigatorState = {
		routes: this.props.routes || [],
	};

	/**
	 * We resolve all screen components here
	 * @param props
	 */
	static getDerivedStateFromProps(props: DrawerNavigatorProps) {

		const routes = (props.routes || []).map(route => {

			// If there is no screen component, render nothing
			if (!route.screen) {
				return route;
			}

			return {
				...route,

				// If screen prop is a string resolve that component from BlueBase, otherwisen use as is
				screen: (typeof route.screen === 'string') ? getComponent(route.screen) : route.screen
			};
		});

		return { routes };
	}

	public render() {

		const BB: BlueBase = this.context;
		const { type, initialRouteName, ...rest } = this.props;
		const { routes } = this.state;

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

	/**
	 * Render each indivitual route
	 * @param route
	 * @param BB
	 */
	private renderRoute(route: RouteConfigWithResolveSubRoutes, BB: BlueBase) {

		const { exact, name, navigationOptions, navigator, path, screen } = route;

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => (
					<DrawerView
						screen={screen}
						navigation={historyToActionObject(routerProps as RouteComponentProps, BB)}
						navigationOptions={navigationOptions}
						navigator={this.props}
					>
					{navigator && renderNavigator(navigator, BB)}
					</DrawerView>
				)}
			</Route>
		);
	}
}