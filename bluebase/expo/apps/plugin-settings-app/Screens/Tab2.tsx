/* eslint-disable react/jsx-no-bind */
// import { DrawerActions } from '../../components';
import { NavigationActions } from '@bluebase/components';
import React from 'react';
import { Button, Text, View } from 'react-native';

// import { MaterialCommunityIcons } from '@expo/vector-icons';

export class Tab2Screen extends React.Component {
	static navigationOptions: any = {
		// tabBarIcon: () => (
		// 	<MaterialCommunityIcons
		// 		// color={tintColor}
		// 		name="database-search"
		// 		size={25}
		// 	/>
		// ),
		title: 'Reports',

		tabBarOptions: {
			labelStyle: {
				fontSize: 20,
			},
			tabStyle: {
				width: 80,
			},
			activeTintColor: 'green',
			inactiveTintColor: 'yellow',
			showIcon: true,
			showLabel: false,
			pressColor: 'red',
			pressOpacity: 80,
			iconStyle: {
				color: 'red',
			},
		},
	};
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Tab 2 Content</Text>
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
