import { Body1, NavigationActions } from '@bluebase/components';
import React from 'react';
import { Button, View } from 'react-native';

export class SettingsScreen extends React.Component {
	static navigationOptions: any = {
		title: 'Static Nav Opts Title',
	};
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Body1>Settings Screen</Body1>
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							// eslint-disable-next-line react/jsx-no-bind
							onPress={() =>
								navigate({ path: 'p/settings/foo?a=b' }, { name: 'General', title: 'Bar' })
							}
						/>
					)}
				</NavigationActions>
			</View>
		);
	}
}
