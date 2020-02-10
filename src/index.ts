import { BasePlugin } from './BasePlugin';
import { Router } from './lib/index';
import { createNavigation } from './components';
import { createPlugin } from '@bluebase/core';

export { createNavigation } from './components';

export default createPlugin({
	...BasePlugin,

	components: {
		...BasePlugin.components,

		Navigation: {
			applyStyles: false,
			value: createNavigation(Router),
		},
	},
});
