import { NavigatorProps, RouteConfig } from '@bluebase/components';

import get from 'lodash.get';
import { resolveThunk } from '@bluebase/core';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function insertChildNavigator(
	parent: NavigatorProps,
	child: NavigatorProps,
	locationRouteName: string
): NavigatorProps {
	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes = resolveThunk(get(parent, 'routes', []) as RouteConfig[]).map((r: RouteConfig) => {
		// Do we have a navigator here, if yes then recurcively prepare its paths as well
		const resolvedNavigator = r.navigator
			? insertChildNavigator(r.navigator, child, locationRouteName)
			: undefined;

		// Return the final object
		return { ...r, navigator: resolvedNavigator };
	});

	const foundIndex = routes.findIndex((route: RouteConfig) => route.name === locationRouteName);

	if (foundIndex >= 0) {
		routes[foundIndex] = {
			...routes[foundIndex],
			navigator: child,
		};
	}

	// Merge and return incoming navigator with newer routes
	return { ...parent, routes };
}
