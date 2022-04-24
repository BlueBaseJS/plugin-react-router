/* eslint-disable react/display-name */
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';
import { DynamicIcon } from '@bluebase/core/dist/components';
import React from 'react';
import { View } from 'react-native';

// Custom component doesn't resepect size in this plugin
export default createPlugin({
	key: 'App 3',
	name: 'Demp App 3',

	icon: {
		component: () => (
			<View style={{ backgroundColor: 'red', borderRadius: 50 }}>
				<DynamicIcon type="icon" name="audiotrack" color="white" />
			</View>
		),
		type: 'component',
	},

	routes: {
		name: 'App3',
		path: '',
		screen: () => <Text>App3</Text>,
	},
});
