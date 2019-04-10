import { BlueBase, BlueBaseContext, getComponent } from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Route, Switch } from '../../lib';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';
import React from 'react';
import { historyToActionObject } from '../../helpers/historyToActionObject';
import { renderNavigator } from '../../helpers/renderNavigator';

export interface SwitchNavigatorProps extends NavigatorPropsWithResolvedRoutes {
}

export interface SwitchNavigatorState {
	routes: RouteConfigWithResolveSubRoutes[];
}

/**
 * The purpose of SwitchNavigator is to only ever show one screen at a time.
 * By default, it does not handle back actions and it resets routes to their
 * default state when you switch away. This is the exact behavior that we want
 * from the authentication flow.
 */
export class SwitchNavigator extends React.Component<SwitchNavigatorProps> {

	static contextType = BlueBaseContext;

	readonly state: SwitchNavigatorState = {
		routes: this.props.routes || [],
	};

	/**
	 * We resolve all screen components here
	 * @param props
	 */
	static getDerivedStateFromProps(props: SwitchNavigatorProps) {

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

		// If there are no routes reder nothing
		if (routes.length === 0) {
			return null;
		}

		// Render all routes inside a Switch component
		return (
			<Switch {...rest}>
				{routes.map(route => this.renderRoute(route, BB))}
			</Switch>
		);
	}

	/**
	 * Render each indivitual route
	 * @param route
	 * @param BB
	 */
	private renderRoute(route: RouteConfigWithResolveSubRoutes, BB: BlueBase) {

		const { exact, name, navigationOptions, navigator, path, screen: ScreenComponent } = route;

		// If there is no screen component, render nothing
		if (!ScreenComponent) {
			return null;
		}

		return (
			<Route key={name} exact={exact} path={path}>
			{(routerProps: RouteChildrenProps) => (
				<ScreenComponent
					navigation={historyToActionObject(routerProps as RouteComponentProps, BB)}
					navigationOptions={navigationOptions}
					navigator={this.props}
				>
				{navigator && renderNavigator(navigator, BB)}
				</ScreenComponent>
			)}
			</Route>
		);
	}
}