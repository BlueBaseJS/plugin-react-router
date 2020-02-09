import { Switch, useLocation } from 'react-router-dom';

import { Dialog } from '@bluebase/components';
import React from 'react';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { StackNavigatorProps } from './StackNavigator';
import get from 'lodash.get';
import { useNavigation } from '@bluebase/core';

export interface ModalNavigatorProps extends StackNavigatorProps {}

export const ModalNavigator = (props: ModalNavigatorProps) => {
	const { children, initialRouteName, routes } = props;
	const location = useLocation();
	const { navigate } = useNavigation();

	// Find initial route
	const currentIndex = routes.findIndex(
		(route: RouteConfigWithResolveSubRoutes) => route.path === location.pathname
	);

	const initialRouteIndex = initialRouteName
		? routes.findIndex((route: RouteConfigWithResolveSubRoutes) => route.name === initialRouteName)
		: 0;

	const initialRoute = routes[initialRouteIndex];

	const isInitialRoute = currentIndex === initialRouteIndex;

	const initialRouteLocation = {
		pathname: initialRoute.path,
		search: '',
		hash: '',
		state: {},
		// key: 'v8ge9s',
	};

	if (isInitialRoute) {
		return children as any;
	}

	// Find refferer
	const referrer = get(location, 'state.__referrer');

	const background =
		referrer && referrer.pathname.startsWith(routes[initialRouteIndex].path)
			? referrer
			: initialRouteLocation;

	const onDismiss = () => navigate({ path: referrer.pathname, params: referrer.state });

	return (
		<React.Fragment>
			<Switch location={background}>{children}</Switch>
			<Dialog visible dismissable onDismiss={onDismiss}>
				{children}
			</Dialog>
		</React.Fragment>
	);
};

ModalNavigator.displayName = 'ModalNavigator';
