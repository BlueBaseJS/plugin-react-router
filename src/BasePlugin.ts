import { DrawerView, TabBar, TabView } from './navigators';
import { Header, HeaderBackButton, HeaderTitle, Navigator, ScreenView } from './components';

export const BasePlugin = {
	description: 'Use React Router navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-router',
	name: 'BlueBase React Router Plugin',
	version: '1.0.0',

	components: {
		DrawerView,
		Header,
		HeaderBackButton,
		HeaderTitle,
		TabBar,
		TabView,

		Navigator: {
			applyStyles: false,
			value: Navigator,
		},

		ScreenView: {
			applyStyles: false,
			value: ScreenView,
		},
	},
};
