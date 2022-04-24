import {
	NavigationActionParams,
	NavigationActionPathPayload,
	NavigationActionPayload,
	NavigatorProps,
	NavitionActionRouteNamePayload,
} from '@bluebase/components';
import { joinPaths } from '@bluebase/core';
import { compile } from 'path-to-regexp';

import { findRouteByKey } from './findRouteByKey';

export const executeAction = (
	configs: NavigatorProps,
	fn: any,
	routeName: NavigationActionPayload,
	params: NavigationActionParams = {}
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
	} else if (routeName && typeof (routeName as NavigationActionPathPayload).path === 'string') {
		path = (routeName as any).path;
	}

	if (!path) {
		throw Error('Invalid props provided to navigation action');
	}

	const toPath = compile(`/${joinPaths(path)}`);
	fn(toPath(params), params);
};
