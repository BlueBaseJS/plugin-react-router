/* eslint-disable react/jsx-no-bind */
// import { DrawerActions } from '../../components';
import { NavigationActions } from '@bluebase/components';
import React from 'react';
import { Button, Text, View } from 'react-native';

export class Tab1Screen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Tab 1 Content</Text>
				<NavigationActions>
					{({ navigate }: any) => <Button title="Home" onPress={() => navigate('Home')} />}
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
