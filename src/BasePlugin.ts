import { DrawerView, ScreenView, TabBar, TabView } from './navigators';
import { Header, HeaderBackButton, HeaderTitle } from './components';

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
		ScreenView,
		TabBar,
		TabView,
	},
};
