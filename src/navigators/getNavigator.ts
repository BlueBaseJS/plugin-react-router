import { DrawerNavigator, StackNavigator, SwitchNavigator, TabNavigator } from './';

const NavigatorMap: { [key: string]: any } = {
	'bottom-tab': TabNavigator,
	'bottom-tabs': TabNavigator,

	drawer: DrawerNavigator,

	'bottom-navigation': TabNavigator,
	'material-bottom-tab': TabNavigator,
	'material-bottom-tabs': TabNavigator,

	tab: TabNavigator,
	tabs: TabNavigator,

	'native-stack': StackNavigator,

	stack: StackNavigator,

	switch: SwitchNavigator,
};

/**
 * Get Navigator by type (V5)
 * @param type
 * @param BB
 */
export const getNavigator = (type?: string) => {
	return NavigatorMap[type || 'stack'];
};
