import { BlueBase, BlueBaseContext, NavigationActionsObject, resolveThunk } from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Noop, Redirect, RouteConfig } from '@bluebase/components';
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

	constructor(props: BaseNavigatorProps) {
		super(props);

    // This binding is necessary to make `this` work in the callback
		this.getNavigationOptions = this.getNavigationOptions.bind(this);
	}

	/**
	 * We resolve all screen components here
	 * @param props
	 */
	componentWillMount() {

		const BB: BlueBase = this.context;

		const routes = (this.props.routes || []).map(route => {

			// If there is no screen component, render nothing
			if (!route.screen) {
				return route;
			}

			// If screen prop is a string resolve that component from BlueBase, otherwisen use as is
			const screen = (typeof route.screen === 'string')
			? BB.Components.resolve(route.screen)
			: route.screen;

			return { ...route, screen };
		});

		this.setState({ routes });
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

		const { exact, name, navigator, path, screen } = route;

		const RouteView = this.props.RouteView || screen || Noop;

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(routerProps as RouteComponentProps, BB);

					return (
						<RouteView
							screen={screen}
							navigation={navigation}
							navigationOptions={this.getNavigationOptions(route, navigation)}
							navigator={this.props}
						>
							{navigator && renderNavigator(navigator, BB)}
						</RouteView>
					);
				}}
			</Route>
		);
	}

	private getNavigationOptions(
		route: RouteConfig,
		navigation: NavigationActionsObject
	) {

		const BB: BlueBase = this.context;

		// Save the resolved tree in configs to use later
		const mainNavigationConfigs = BB.Configs.getValue('plugin.react-router.navigationConfigs');

		// Extract screenProps
		const screenProps = { ...mainNavigationConfigs.screenProps, BB };

		// Create navigationOptions from main navigation configs
		let navigationOptions = resolveThunk(
			mainNavigationConfigs.defaultNavigationOptions,
			{ navigation, screenProps, navigationOptions: {} },
		);

		// Create navigationOptions from navigatior defaultNavigationOptions
		navigationOptions = resolveThunk(
			this.props.defaultNavigationOptions || {},
			{ navigation, screenProps, navigationOptions },
		);

		// Now, create navigationOptions from route's navigationOptions object
		navigationOptions = resolveThunk(
			route.navigationOptions || {},
			{ navigation, screenProps, navigationOptions },
		);

		// And finally, create navigationOptions from route.screen NavigationOptions
		navigationOptions = resolveThunk(
			route.screen && (route.screen as any).navigationOptions || {},
			{ navigation, screenProps, navigationOptions },
		);

		// Phew...
		return navigationOptions;
	}
}