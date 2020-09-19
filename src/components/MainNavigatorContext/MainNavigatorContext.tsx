import { NavigatorProps, RouteConfig } from '@bluebase/components';
import React, { createContext, useState } from 'react';

import { resolveThunk } from '@bluebase/core';

export interface MainNavigatorContextData {
	navigator: NavigatorProps;
	insertStandalone: (props: NavigatorProps, parentRouteName: string) => void;
}
export const MainNavigatorContext = createContext<MainNavigatorContextData>({
	navigator: { routes: [] },
	insertStandalone: () => null,
});

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function insertChildNavigator(
	parent: NavigatorProps,
	child: NavigatorProps,
	locationRouteName: string
): NavigatorProps {
	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes = resolveThunk(parent.routes || []).map((r: RouteConfig) => {
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

export const MainNavigatorContextProvider = (props: any) => {
	const { value, children } = props;

	const [rawNavigator, setRawNavigator] = useState(value);

	// const navigator = useMemo(() => preparePaths(rawNavigator), [rawNavigator]);

	const insertStandalone = (props: NavigatorProps, parentRouteName: string) => {
		setRawNavigator(insertChildNavigator(rawNavigator, props, parentRouteName));
	};

	return (
		<MainNavigatorContext.Provider value={{ navigator: rawNavigator, insertStandalone }}>
			{children}
		</MainNavigatorContext.Provider>
	);
};

MainNavigatorContextProvider.displayName = 'MainNavigatorContextProvider';
