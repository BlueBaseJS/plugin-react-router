/* eslint-disable react/display-name */
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';
import React from 'react';

export default createPlugin({
	key: 'app-1',
	name: 'D App 1',

	icon: {
		name: 'delete',
		type: 'icon',
	},

	routes: {
		name: 'App1',
		path: '',
		screen: () => <Text>App1</Text>,
	},
});
