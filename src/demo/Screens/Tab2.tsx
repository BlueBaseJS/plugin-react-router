import { Button, Text, View } from 'react-native';
// import { DrawerActions } from '../../components';
import { NavigationActions } from '@bluebase/core';
import React from 'react';

export class Tab2Screen extends React.Component {
	render() {
		return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Tab 2 Content</Text>
        <NavigationActions>
          {({ navigate }: any) => (
            <Button
              title="Home"
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
