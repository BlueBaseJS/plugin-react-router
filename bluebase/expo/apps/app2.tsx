/* eslint-disable react/display-name */
import React from 'react';
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	key: 'App 2',
	name: 'Demp App 2, This one has a long name',

	icon: {
		source: { uri: 'https://placeimg.com/300/300/any' },
		type: 'image',
	},

	routes: {
		name: 'App2',
		path: '',
		screen: () => <Text>App2</Text>,
	},
});
