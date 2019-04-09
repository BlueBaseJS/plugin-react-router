import { TabBar, TabView } from './TabNavigator';
import { DrawerView } from './DrawerView';
import { Navigation } from './Navigation';
import { NavigationActions } from './NavigationActions';
import { Screen } from './Screen';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	description: 'Use React Router navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-router',
	name: 'BlueBase React Router Plugin',
	version: '1.0.0',

	defaultConfigs: {
		/**
		 * If enabled, navigation.source value is set with router value
		 * from react-router's context.
		 */
		'plugin.react-router.enableSourceInNavigationActions': true,
	},

	components: {
		DrawerView,
		Navigation,
		NavigationActions,
		Screen,
		TabBar,
		TabView,
	}
});
