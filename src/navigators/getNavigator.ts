import { BottomNavigation, Stack, Switch, Tab } from './';

const NavigatorMap: { [key: string]: any } = {
	'bottom-tab': BottomNavigation,
	'bottom-tabs': BottomNavigation,

	drawer: Stack,

	'bottom-navigation': BottomNavigation,
	'material-bottom-tab': BottomNavigation,
	'material-bottom-tabs': BottomNavigation,

	tab: Tab,
	tabs: Tab,

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
