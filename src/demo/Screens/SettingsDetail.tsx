import { Button, Text, View } from '@bluebase/components';
import { NavigationActions } from '@bluebase/core';
import React from 'react';

export class SettingsDetailScreen extends React.Component {
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
