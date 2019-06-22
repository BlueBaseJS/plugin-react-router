import { BasePlugin } from './index';
import { StaticRouter } from './lib';
import { createNavigation } from './components';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	...BasePlugin,

	components: {
		...BasePlugin.components,
		Navigation: createNavigation(StaticRouter),
	},
});
