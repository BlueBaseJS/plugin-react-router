import {
	NavigatorProps as BBNavigatorProps,
	NavigationActionsObject,
	Redirect,
	RouteConfig,
} from '@bluebase/components';
import {
	MainNavigatorContext,
	MainNavigatorContextProvider,
	insertChildNavigator,
} from '../MainNavigatorContext';
import { NavigationContext, resolveThunk, useComponent, useNavigation } from '@bluebase/core';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom';
import {
	findRouteByKey,
	historyToActionObject,
	preparePaths,
	resolveRouteOptions,
	useScreenProps,
} from '../../helpers';

import { RouteConfigWithResolveSubRoutes } from '../../types';
import { getNavigator } from '../../navigators';

export interface NavigatorProps extends BBNavigatorProps {
	standalone: boolean;
}

export const NavigatorInternal = ({ standalone, ...props }: NavigatorProps) => {
	const ScreenView = useComponent('ScreenView');
	const screenProps = useScreenProps();
	const { navigator } = useContext(MainNavigatorContext);

	// eslint-disable-next-line react/prop-types
	const { type, initialRouteName, routes, ...rest } = props;

	const NavigatorImpl = getNavigator(type);

	if (!NavigatorImpl) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes =
		resolveThunk<RouteConfigWithResolveSubRoutes[]>(routes as any, screenProps) || [];

	/**
	 * Render each indivitual route
	 * @param route
	 */
	const renderRoute = (route: RouteConfigWithResolveSubRoutes) => {
		const { exact, name, path } = route;

		return (
			<Route key={name} exact={exact} path={path}>
				{(routerProps: RouteChildrenProps) => {
					const navigation: NavigationActionsObject = historyToActionObject(routerProps, navigator);

					return (
						<NavigationContext.Provider value={navigation}>
							<ScreenView
								Layout={NavigatorImpl.Screen}
								navigator={props}
								route={route}
								navigation={navigation}
								options={resolveRouteOptions(route, props, navigator, {
									navigation,
									screenProps,
									route: { ...route, params: navigation.state.params },
								})}
							>
								{route.navigator ? <Navigator {...route.navigator} standalone={false} /> : null}
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
						navigator
					);

					return (
						<NavigationContext.Provider value={navigation}>
							<Redirect
								routeName={initialRouteName || resolvedRoutes[0].name}
								params={navigation.state.params}
							/>
						</NavigationContext.Provider>
					);
				}}
			</Route>
		);
	};

	return (
		<NavigatorImpl.Navigator {...props} routes={resolvedRoutes}>
			<Switch {...rest}>
				{resolvedRoutes.map(renderRoute)}
				{renderInitialRoute()}
			</Switch>
		</NavigatorImpl.Navigator>
	);
};

export const Navigator = ({
	standalone,
	standaloneLocationRouteName,
	...inputProps
}: NavigatorProps) => {
	// If navigator is not standalone, we don't need to do anything special
	if (!standalone) {
		return <NavigatorInternal {...inputProps} standalone={false} />;
	}

	const { state } = useNavigation();

	// Extract parent navigator/routes
	const { navigator: mainNavigator } = useContext(MainNavigatorContext);

	// Merge standalone navigator into parent
	const newNav = insertChildNavigator(mainNavigator, inputProps, state.routeName);

	// Prepare paths
	const navigatorObject = preparePaths(newNav);

	// Find processed standalone navigator
	const routeObj = findRouteByKey(state.routeName, 'name', navigatorObject);

	const key = (routeObj!.navigator!.routes as RouteConfig[])
		.map((r: RouteConfig) => r.name)
		.join(',');

	// Need to re-create main navigation context with new merged configs
	return (
		<MainNavigatorContextProvider key={key} value={navigatorObject}>
			<Route>
				{(routerProps: RouteChildrenProps) => {
					// Need to re-create navigation context with new merged configs
					const navigation: NavigationActionsObject = historyToActionObject(
						routerProps as RouteComponentProps,
						navigatorObject
					);

					return (
						<NavigationContext.Provider value={navigation}>
							<NavigatorInternal {...routeObj!.navigator!} standalone={false} />
						</NavigationContext.Provider>
					);
				}}
			</Route>
		</MainNavigatorContextProvider>
	);
};

Navigator.displayName = 'Navigator';

Navigator.displayProps = {
	standalone: true,
	// standaloneLocationRouteName: '',
};
