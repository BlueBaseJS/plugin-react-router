import { createPlugin } from '@bluebase/core';

import { BasePlugin } from './BasePlugin';
import { createNavigation } from './components';
import { MemoryRouter } from './lib';

export default createPlugin({
	...BasePlugin,

	components: {
		...BasePlugin.components,

		Navigation: {
			applyStyles: false,
			value: createNavigation(MemoryRouter),
		},
	},
});
