import { Button, Text, View } from 'react-native';
// import { DrawerActions } from '../../components';
import { NavigationActions } from '@bluebase/core';
import React from 'react';

export class Tab1Screen extends React.Component {
	render() {
		return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Tab 1 Content</Text>
        <NavigationActions>
          {({ navigate }: any) => (
            <Button
              title="Home"
              // tslint:disable-next-line: jsx-no-lambda
              onPress={() => navigate('Home')}
            />
          )}
        </NavigationActions>
        {/* <DrawerActions>
          {({ toggleDrawer }: any) => (
            <Button
              title="Toggle Drawer"
              onPress={() => toggleDrawer()}
            />
          )}
        </DrawerActions> */}
      </View>
		);
	}
}
