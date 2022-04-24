import { createPlugin } from '@bluebase/core';

import { BasePlugin } from './BasePlugin';
import { createNavigation } from './components';
import { Router } from './lib/index';

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
