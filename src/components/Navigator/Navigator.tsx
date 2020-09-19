import {
	NavigatorProps as BBNavigatorProps,
	NavigationActionsObject,
	Redirect,
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
	// standaloneLocationRouteName: string;
}

export const NavigatorInternal = ({
	standalone,
	// standaloneLocationRouteName,
	...props
}: NavigatorProps) => {
	const ScreenView = useComponent('ScreenView');
	const screenProps = useScreenProps();
	const { navigator: mainNavigator } = useContext(MainNavigatorContext);

	// const [props] = useState(standalone === false ? inputProps : preparePaths(inputProps));

	// useLayoutEffect(() => {
	// 	if (standalone) {
	// 		insertStandalone(inputProps, standaloneLocationRouteName);
	// 	}
	// }, [standalone, standaloneLocationRouteName, inputProps]);

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
									route: { ...route, params: navigation.state.params },
								})}
							>
								{route.navigator ? (
									<Navigator
										{...route.navigator}
										standalone={false}
										// standaloneLocationRouteName={standaloneLocationRouteName}
									/>
								) : null}
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
	if (!standalone) {
		return <NavigatorInternal {...inputProps} standalone={false} />;
	}

	const { navigator: mainNavigator } = useContext(MainNavigatorContext);

	const { state } = useNavigation();
	const newNav = insertChildNavigator(mainNavigator, inputProps, state.routeName);
	const navigatorObject = preparePaths(newNav);

	const routeObj = findRouteByKey(state.routeName, 'name', navigatorObject);

	console.log('routeObj', routeObj);
	return (
		<MainNavigatorContextProvider value={navigatorObject}>
			<Route>
				{(routerProps: RouteChildrenProps) => {
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
			{/* <Text>Hello sstandalone</Text> */}
		</MainNavigatorContextProvider>
	);
};

Navigator.displayName = 'Navigator';

Navigator.displayProps = {
	standalone: true,
	// standaloneLocationRouteName: '',
};
