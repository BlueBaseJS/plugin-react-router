import { RouteConfig } from '@bluebase/components';
import { BlueBase } from '@bluebase/core';
import React from 'react';

const Noop = ({ children }: any) => children;
Noop.displayName = 'Noop';

/**
 * Given a route object, resolves and returns a screen component
 * @param route
 * @param BB
 */
export const resolveScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const componentName: string | React.ComponentType<any> = route.component || route.screen || Noop;
	const Component = BB.Components.resolveFromCache(componentName);

	if (typeof componentName === 'string') {
		Component.displayName = componentName;
	}

	return Component;
};
