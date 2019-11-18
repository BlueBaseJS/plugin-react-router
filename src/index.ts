import { BasePlugin } from './BasePlugin';
import { Router } from './lib/index';
import { createNavigation } from './components';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	...BasePlugin,

	components: {
		...BasePlugin.components,
		Navigation: createNavigation(Router),
	},
});
