import {
	BlueBase,
	NavigationActionParams,
	NavigationActionsObject,
	NavigatorProps,
} from '@bluebase/core';
import { RouteComponentProps } from '../lib';
import { executeAction } from './exectureAction';
import { findRouteByKey } from './findRouteByKey';

export const historyToActionObject = (router: RouteComponentProps, BB: BlueBase) => {

	const configs: NavigatorProps = BB.Configs.getValue('plugin.react-router.navigationConfigs');
	const enableSource: boolean = BB.Configs.getValue('plugin.react-router.enableSourceInNavigationActions');

	const obj = findRouteByKey(router.match.path, 'path', configs);

	const actions: NavigationActionsObject = {

		navigate: (routeName, params?: NavigationActionParams) => {
			return executeAction(configs, router.history.push, routeName, params);
		},

		push: (routeName, params?: NavigationActionParams) => {
			return executeAction(configs, router.history.push, routeName, params);
		},

		replace: (routeName, params?: NavigationActionParams) => {
			return executeAction(configs, router.history.replace, routeName, params);
		},

		pop: (steps: number = 0) => {
			router.history.go(steps * -1);
		},

		goBack: () => {
			router.history.goBack();
		},

		setParams: (params: NavigationActionParams) => {
			router.history.replace(router.match.path, { ...router.match.params, ...params });
		},

		getParam: (key: string, defaultValue: any) => {
			return (router.match.params as any)[key] || defaultValue;
		},

		source: enableSource ? router : undefined,

		state: {
			key: router.location.key,
			params: { ...router.location.state, ...router.match.params },
			routeName: obj ? obj.name : '',
			search: router.location.search,
			url: router.match.url,
		},
	};

	return actions;
};

