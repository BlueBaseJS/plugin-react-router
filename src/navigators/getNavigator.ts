import { Stack, Switch } from './';

const NavigatorMap: { [key: string]: any } = {
	'bottom-tab': Stack,
	'bottom-tabs': Stack,

	drawer: Stack,

	'bottom-navigation': Stack,
	'material-bottom-tab': Stack,
	'material-bottom-tabs': Stack,

	tab: Stack,
	tabs: Stack,

	'native-stack': Stack,

	stack: Stack,

	switch: Switch,
};

/**
 * Get Navigator by type (V5)
 * @param type
 * @param BB
 */
export const getNavigator = (
	type?: string
): { Navigator: React.ComponentType<any>; Screen: React.ComponentType<any> } => {
	return NavigatorMap[type || 'stack'];
};
