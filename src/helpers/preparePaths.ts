import { NavigatorProps, RouteConfig } from '@bluebase/components';
import { joinPaths, resolveThunk } from '@bluebase/core';

import { NavigatorPropsWithResolvedRoutes } from '../types';

/**
 * Converts paths from react-navigation pattern to react-router pattern
 * @param navigator
 * @param parentPath
 */
export const preparePaths = (
	navigator: NavigatorProps,
	parentPath: string = ''
): NavigatorPropsWithResolvedRoutes => {
	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes = resolveThunk(navigator.routes || []).map((r: RouteConfig) => {
		// Create new path by joing current path with parent path
		const path = `/${joinPaths(parentPath, r.path)}`;

		// Do we have a navigator here, if yes then recurcively prepare its paths as well
		const resolvedNavigator = r.navigator ? preparePaths(r.navigator, path) : undefined;

		// Return the final object
		return { ...r, navigator: resolvedNavigator, path };
	});

	// Merge and return incoming navigator with newer routes
	return { ...navigator, routes };
};
