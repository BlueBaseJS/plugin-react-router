import { Button, NavigationActions, Text, View } from '@bluebase/components';
import React from 'react';

export class SettingsDetailScreen extends React.Component {
	static navigationOptions = ({ navigation }: any) => ({
		title: navigation.getParam('name', 'Dummy'),
	})
	render() {
		// console.log('settings details screen props', this.props);
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Settings Details Screen</Text>
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							// tslint:disable-next-line: jsx-no-lambda
							onPress={() => navigate('Home')}
						/>
					)}
				</NavigationActions>
			</View>
		);
	}
}
