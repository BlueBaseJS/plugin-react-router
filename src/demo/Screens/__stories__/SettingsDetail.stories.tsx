// import * as mocks from './mocks';

import { BlueBaseApp } from '@bluebase/core';
// import { MockedProvider } from 'react-apollo/test-utils';
import Plugin from '../../../index';
import React from 'react';
// import { SettingsDetailScreen } from '../SettingsDetail';
import storiesOf from '@bluebase/storybook-addon';

// const DeleteThingSetting = getComponent('DeleteThingSetting');

storiesOf('Setting', module).add('Basic Example', () => (
	<BlueBaseApp
		plugins={[
			Plugin,
			require('@bluebase/plugin-apollo'),
			// require('@mevris/client-plugin-ui'),
			// require('@bluebase/plugin-react-router'),
			require('@bluebase/plugin-material-ui'),
			// require('@bluebase/plugin-json-schema-components'),
		]}
		// configs={{
		// 	'plugin-react-router.routerProps': {
		// 		location: { pathname: '/p/things/123/settings' },
		// 	},
		// 	'plugin-react-router.routerType': 'memory',
		// }}
	/>
));
