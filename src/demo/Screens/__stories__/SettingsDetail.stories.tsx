// import * as mocks from './mocks';

import { BlueBaseApp } from '@bluebase/core';
// import { MockedProvider } from 'react-apollo/test-utils';
import Plugin from '../../../index';
import PluginDemo from '../../index';
import React from 'react';
// import { SettingsDetailScreen } from '../SettingsDetail';
import storiesOf from '@bluebase/storybook-addon';

// const DeleteThingSetting = getComponent('DeleteThingSetting');

storiesOf('Setting', module).add('Basic Example', () => (
	<BlueBaseApp
		plugins={[
			Plugin,
			PluginDemo,
			require('@bluebase/plugin-apollo'),
			require('@bluebase/plugin-material-ui'),
		]}
		configs={{
			'plugin-react-router.routerProps': {
				initialEntries: [{ pathname: '/p/settings/foo?a=b' }],
			},
			'plugin-react-router.routerType': 'memory',
		}}
	/>
));
