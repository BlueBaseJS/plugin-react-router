import {
	NavigationActionsObject,
	NavigatorProps,
	Redirect,
	RouteConfig,
} from '@bluebase/components';
import {
	NavigationContext,
	resolveThunk,
	useBlueBase,
	useComponent,
	useIntl,
	useTheme,
} from '@bluebase/core';
import React, { useContext } from 'react';
import { Route, Switch } from '../../lib';
import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom';
import { RouteConfigWithResolveSubRoutes, ScreenProps } from '../../types';

import { MainNavigatorContext } from '../Navigation';
import { getNavigator } from '../../navigators';
import { historyToActionObject } from '../../helpers';

export const Navigator = (props: NavigatorProps) => {
	const { type, initialRouteName, routes, ...rest } = props;
	const mainNavigator = useContext(MainNavigatorContext);

	const ScreenView = useComponent('ScreenView');

	const BB = useBlueBase();
	const themes = useTheme();
	const intl = useIntl();
	const screenProps: ScreenProps = { BB, intl, themes, theme: themes.theme };

	const NavigatorImpl = getNavigator(type);

	if (!NavigatorImpl) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(
		routes as any,
		screenProps
	);

	/**
	 * Render each indivitual route
	 * @param route
	 */
	const renderRoute = (route: RouteConfigWithResolveSubRoutes) => {
		const { exact, name, navigator: subNavigator, path } = route;

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(
						routerProps as RouteComponentProps,
						mainNavigator
					);

					return (
						<NavigationContext.Provider value={navigation}>
							<ScreenView
								Layout={NavigatorImpl.Screen}
								navigator={subNavigator}
								route={route}
								navigation={navigation}
								options={resolveRouteOptions(route, props, mainNavigator, {
									navigation,
									screenProps,
								})}
							>
								{subNavigator ? <Navigator {...subNavigator} /> : null}
							</ScreenView>
						</NavigationContext.Provider>
					);
				}}
			</Route>
		);
	};

	/**
	 * Redirects to the initial route, if non is given redirects to the
	 * first route in the routes array.
	 */
	const renderInitialRoute = () => {
		if (resolvedRoutes.length === 0) {
			return null;
		}

		return (
			<Route>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(
						routerProps as RouteComponentProps,
						mainNavigator
					);

					return <Redirect routeName={initialRouteName} params={navigation.state.params} />;
				}}
			</Route>
		);
	};

	return (
		<NavigatorImpl.Navigator {...props}>
			<Switch {...rest}>
				{resolvedRoutes.map(renderRoute)}
				{renderInitialRoute()}
			</Switch>
		</NavigatorImpl.Navigator>
	);
};

const resolveRouteOptions = (
	route: RouteConfig,
	navigator: NavigatorProps,
	mainNavigator: NavigatorProps,
	ctx: {
		navigation: NavigationActionsObject;
		screenProps: ScreenProps;
	}
) => {
	// // Extract screenProps
	// const screenProps: ScreenProps = {
	// 	...mainNavigator.screenProps,
	// 	...params.screenProps
	// };

	// Create navigationOptions from main navigation configs
	let navigationOptions = resolveThunk(mainNavigator.defaultNavigationOptions || {}, {
		...ctx,
		navigationOptions: {},
	});

	// Create navigationOptions from navigatior defaultNavigationOptions
	navigationOptions = resolveThunk(navigator.defaultNavigationOptions || navigationOptions, {
		...ctx,
		navigationOptions,
	});

	// Now, create navigationOptions from route's navigationOptions object
	navigationOptions = resolveThunk(route.navigationOptions || navigationOptions, {
		...ctx,
		navigationOptions,
	});

	// And finally, create navigationOptions from route.screen NavigationOptions
	navigationOptions = resolveThunk(
		(route.screen && (route.screen as any).navigationOptions) || navigationOptions,
		{ ...ctx, navigationOptions }
	);

	// Phew...
	return navigationOptions;
};
