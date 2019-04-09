import {
	joinPaths,
	resolveThunk,
} from '@bluebase/core';
import { NavigatorProps } from '@bluebase/components';

/**
 * Converts paths from react-navigation pattern to react-router pattern
 * @param navigator
 * @param parentPath
 */
export function preparePaths(navigator: NavigatorProps, parentPath: string = ''): NavigatorProps {

	const routes = resolveThunk(navigator.routes).map(r => {
		const path = `/${joinPaths(parentPath, r.path)}`;
		const resolvedNavigator = r.navigator ? preparePaths(r.navigator, path) : undefined;

		return {
			...r,
			navigator: resolvedNavigator,
			path,
		};
	});

	return {
		...navigator,
		routes,
	};
}
