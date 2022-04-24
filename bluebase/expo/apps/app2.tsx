/* eslint-disable react/display-name */
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';
import React from 'react';

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
