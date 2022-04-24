/* eslint-disable react/jsx-no-bind */
import { NavigationActions } from '@bluebase/components';
import React from 'react';
import { Button, Text, View } from 'react-native';

export class ParamsScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Settings Screen</Text>
				<NavigationActions>
					{({ getParam, setParams, state }: any) => (
						<>
							<Text>{JSON.stringify(state.params)}</Text>
							<Text>Label: {getParam('label', 'unset')}</Text>
							<Button title="Label 1" onPress={() => setParams({ label: 'Label 1' })} />
							<Button title="Label 2" onPress={() => setParams({ label: 'Label 2' })} />
						</>
					)}
				</NavigationActions>
			</View>
		);
	}
}
