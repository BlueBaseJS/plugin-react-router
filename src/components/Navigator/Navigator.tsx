import { NavigationActionsObject, NavigatorProps, Redirect } from '@bluebase/components';
import { NavigationContext, resolveThunk, useComponent } from '@bluebase/core';
import React, { useContext } from 'react';
import { Route, Switch } from '../../lib';
import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom';
import { historyToActionObject, resolveRouteOptions, useScreenProps } from '../../helpers';

import { MainNavigatorContext } from '../Navigation';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { getNavigator } from '../../navigators';

export const Navigator = (props: NavigatorProps) => {
	const { type, initialRouteName, routes, ...rest } = props;
	const mainNavigator = useContext(MainNavigatorContext);

	const ScreenView = useComponent('ScreenView');
	const screenProps = useScreenProps();

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
		const { exact, name, path } = route;

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(
						routerProps,
						mainNavigator
					);

					return (
						<NavigationContext.Provider value={navigation}>
							<ScreenView
								Layout={NavigatorImpl.Screen}
								navigator={props}
								route={route}
								navigation={navigation}
								options={resolveRouteOptions(route, props, mainNavigator, {
									navigation,
									screenProps,
								})}
							>
								{route.navigator ? <Navigator {...route.navigator} /> : null}
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

					return (
						<Redirect
							routeName={initialRouteName || resolvedRoutes[0].name}
							params={navigation.state.params}
						/>
					);
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
