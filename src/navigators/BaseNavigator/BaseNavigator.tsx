import { BlueBase, BlueBaseContext, getComponent, NavigationActionsObject, resolveThunk } from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Noop, Redirect } from '@bluebase/components';
import { Route, Switch } from '../../lib';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';
import React from 'react';
import { historyToActionObject } from '../../helpers/historyToActionObject';
import { renderNavigator } from '../../helpers/renderNavigator';

export interface BaseNavigatorProps extends NavigatorPropsWithResolvedRoutes {
}

export interface BaseNavigatorState {
	routes: RouteConfigWithResolveSubRoutes[];

	RouteView?: React.ComponentType<any>;
}

/**
 * Base Navigator
 *
 * Contain functionality common to all Navigators
 */
export class BaseNavigator extends React.Component<BaseNavigatorProps> {

	static contextType = BlueBaseContext;

	readonly state: BaseNavigatorState = {
		routes: this.props.routes || [],
	};

	/**
	 * We resolve all screen components here
	 * @param props
	 */
	static getDerivedStateFromProps(props: BaseNavigatorProps) {

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
	protected renderRoute(route: RouteConfigWithResolveSubRoutes, BB: BlueBase) {

		const { exact, name, navigationOptions, navigator, path, screen } = route;

		const RouteView = this.props.RouteView || screen || Noop;

		const finalNavigationOptions =
			(navigation: NavigationActionsObject) => (screen && (screen as any).navigationOptions !== undefined) ?
				{
					...navigationOptions,
					...resolveThunk((screen as any).navigationOptions, { navigation })
				} : {
					...navigationOptions
				};

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(routerProps as RouteComponentProps, BB);
					return (
						<RouteView
							screen={screen}
							navigation={navigation}
							navigationOptions={finalNavigationOptions(navigation)}
							navigator={this.props}
						>
							{navigator && renderNavigator(navigator, BB)}
						</RouteView>
					);
				}
				}
			</Route>
		);
	}
}