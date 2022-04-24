import { Dialog } from '@bluebase/components';
import { useNavigation } from '@bluebase/core';
import get from 'lodash.get';
import { compile } from 'path-to-regexp';
import React from 'react';

import { Switch, useLocation } from '../../lib';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { StackNavigatorProps } from './StackNavigator';

export interface ModalNavigatorProps extends StackNavigatorProps {}

export const ModalNavigator = (props: ModalNavigatorProps) => {
	const { children, initialRouteName, routes } = props;
	const location = useLocation();
	const { navigate } = useNavigation();

	// Find initial route
	const currentIndex = routes.findIndex((route: RouteConfigWithResolveSubRoutes) => {
		const toPath = compile(route.path);
		return toPath(get(location, 'state', {})!) === location.pathname;
	});

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
	};

	if (
		isInitialRoute ||
		location.pathname.startsWith(compile(initialRouteLocation.pathname)(location.state!))
	) {
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
