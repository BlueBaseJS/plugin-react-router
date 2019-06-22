import { DrawerView, ScreenView, TabBar, TabView } from './navigators';
import {
	Header,
	HeaderBackButton,
	HeaderTitle,
	NavigationActions,
	createNavigation,
} from './components';

import { createPlugin } from '@bluebase/core';

export const BasePlugin = {
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
		Header,
		HeaderBackButton,
		HeaderTitle,
		Navigation: createNavigation(),
		NavigationActions,
		ScreenView,
		TabBar,
		TabView,
	},
};

export default createPlugin(BasePlugin);
