import {
	BlueBase,
	BlueBaseContext,
	resolveThunk,
} from '@bluebase/core';
import { NavigationActionsObject, Noop, Redirect, RouteConfig } from '@bluebase/components';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { Route, Switch } from '../../lib';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';
import { InternalNavigator } from '../../components/InternalNavigator';
import React from 'react';
import { historyToActionObject } from '../../helpers/historyToActionObject';

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
		this.renderInitialRoute = this.renderInitialRoute.bind(this);
		this.renderRoute = this.renderRoute.bind(this);
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

		// const BB: BlueBase = this.context;
		const { type, initialRouteName: _initialRouteName, ...rest } = this.props;
		const { routes } = this.state;

		if (routes.length === 0) {
			return null;
		}

		return (
			<Switch {...rest}>
				{routes.map(this.renderRoute)}
				{this.renderInitialRoute()}
			</Switch>
		);
	}

	/**
	 * Render each indivitual route
	 * @param route
	 * @param BB
	 */
	protected renderRoute(route: RouteConfigWithResolveSubRoutes) {

		const BB: BlueBase = this.context;
		const { exact, name, navigator: subNavigator, path, screen } = route;
		const { routes } = this.state;

		const RouteView = this.props.RouteView || screen || Noop;

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject =
						historyToActionObject(routerProps as RouteComponentProps, BB);

					// Sub Routes
					const navigator = {
						...this.props,
						routes: routes.map(r => ({
							...r,
							navigationOptions: this.getNavigationOptions(r, navigation)
						}))
					};

					//
					return (
						<RouteView
							screen={screen}
							navigation={navigation}
							navigationOptions={this.getNavigationOptions(route, navigation)}
							navigator={navigator}
						>
							{subNavigator ? <InternalNavigator navigator={subNavigator} /> : null}
						</RouteView>
					);
				}}
			</Route>
		);
	}

	/**
	 * Redirects to the initial route, if non is given redirects to the
	 * first route in the routes array.
	 * @param BB
	 */
	protected renderInitialRoute() {

		const BB: BlueBase = this.context;
		const { initialRouteName: _initialRouteName } = this.props;
		const { routes } = this.state;

		if (routes.length === 0) {
			return null;
		}

		const initialRouteName = _initialRouteName || routes[0].name;

		return (
			<Route>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(routerProps as RouteComponentProps, BB);

					return (<Redirect routeName={initialRouteName} params={navigation.state.params} />);
				}}
			</Route>
		);
	}

	private getNavigationOptions(
		route: RouteConfig,
		navigation: NavigationActionsObject
	) {

		const BB: BlueBase = this.context;
		const { screenProps } = this.props;

		// Save the resolved tree in configs to use later
		const mainNavigationConfigs = BB.Configs.getValue('plugin.react-router.navigationConfigs');

		// // Extract screenProps
		// const screenProps: ScreenProps = {
		// 	...mainNavigationConfigs.screenProps,
		// 	...params.screenProps
		// };

		// Create navigationOptions from main navigation configs
		let navigationOptions = resolveThunk(
			mainNavigationConfigs.defaultNavigationOptions || {},
			{ navigation, screenProps, navigationOptions: {} },
		);

		// Create navigationOptions from navigatior defaultNavigationOptions
		navigationOptions = resolveThunk(
			this.props.defaultNavigationOptions || navigationOptions,
			{ navigation, screenProps, navigationOptions },
		);

		// Now, create navigationOptions from route's navigationOptions object
		navigationOptions = resolveThunk(
			route.navigationOptions || navigationOptions,
			{ navigation, screenProps, navigationOptions },
		);

		// And finally, create navigationOptions from route.screen NavigationOptions
		navigationOptions = resolveThunk(
			(route.screen && (route.screen as any).navigationOptions) || navigationOptions,
			{ navigation, screenProps, navigationOptions },
		);

		// Phew...
		return navigationOptions;
	}
}
