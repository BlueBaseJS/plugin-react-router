import { Button, Text, View } from 'react-native';

import { NavigationActions } from '@bluebase/components';
import React from 'react';

export class SettingsDetailScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Settings Details Screen</Text>
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							// eslint-disable-next-line react/jsx-no-bind
							onPress={() => navigate('Home')}
						/>
					)}
				</NavigationActions>
			</View>
		);
	}
}
