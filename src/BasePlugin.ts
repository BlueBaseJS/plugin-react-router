import {
	Header,
	HeaderBackButton,
	HeaderTitle,
	Navigator,
	ScreenView
} from './components';
import { VERSION } from './version';

export const BasePlugin = {
	description: 'Use React Router navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-router',
	name: 'BlueBase React Router Plugin',
	version: VERSION,

	components: {
		Header,
		HeaderBackButton,
		HeaderTitle,

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
