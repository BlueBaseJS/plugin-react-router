import { Button, Text, View } from '@bluebase/components';
import { NavigationActions } from '@bluebase/core';
import React from 'react';

export class SettingsScreen extends React.Component<any, any> {
	static navigationOptions = {
		title: 'New Settings'
	};
	render() {
		// console.log('screen props', this.props);
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Settings Screen</Text>
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							// tslint:disable-next-line: jsx-no-lambda
							onPress={() => navigate({ path: 'p/settings/foo?a=b' }, { name: 'General', title: 'Bar' })}
						/>
					)}
				</NavigationActions>
			</View>
		);
	}
}
