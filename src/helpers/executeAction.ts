import {
	NavigationActionParams,
	NavigationActionPayload,
	NavigatorProps,
	NavitionActionPathPayload,
	NavitionActionRouteNamePayload,
} from '@bluebase/components';
import { findRouteByKey } from './findRouteByKey';
import { joinPaths } from '@bluebase/core';

export const executeAction = (
	configs: NavigatorProps,
	fn: any,
	routeName: NavigationActionPayload,
	params?: NavigationActionParams
) => {
	let path;

	if (typeof routeName === 'string') {
		const routeObj = findRouteByKey(routeName, 'name', configs);
		path = routeObj && routeObj.path;
	} else if (
		routeName &&
		typeof (routeName as NavitionActionRouteNamePayload).routeName === 'string'
	) {
		// const routeObj = findRouteByKey(routeName as any, 'routeName', configs);
		const routeObj = findRouteByKey((routeName as any).routeName, 'name', configs);
		path = routeObj && routeObj.path;
	} else if (routeName && typeof (routeName as NavitionActionPathPayload).path === 'string') {
		path = (routeName as any).path;
	}

	if (!path) {
		throw Error('Invalid props provided to navigation action');
	}

	fn(`/${joinPaths(path)}`, params);
};
