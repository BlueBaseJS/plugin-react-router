import {
	NavigationActionParams,
	NavigationActionPayload,
	NavigatorProps,
	joinPaths
} from '@bluebase/core';
import { findRouteByKey } from './findRouteByKey';

export const executeAction =
(configs: NavigatorProps, fn: any, routeName: NavigationActionPayload, params?: NavigationActionParams) => {

	let path;

	if (typeof routeName === 'string') {
		const routeObj = findRouteByKey(routeName, 'name', configs);
		path = routeObj && routeObj.path;
	}
	else if (typeof (routeName as any).routeName === 'string') {
		const routeObj = findRouteByKey(routeName as any, 'routeName', configs);
		path = routeObj && routeObj.path;
	}
	else if (typeof (routeName as any).path === 'string') {
		path = (routeName as any).path;
	}

	if (!path) {
		throw Error('Invalid props provided to navigation action');
	}

	fn(`/${joinPaths(path)}`, params);
};