import { Button, Text, View } from 'react-native';
// import { DrawerActions } from '../../components';
// import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationActions } from '@bluebase/components';
import React from 'react';
// import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

export class Tab2Screen extends React.Component {
	static navigationOptions = {
		// tabBarIcon: () => (
			// <MaterialCommunityIcons
			// 	// color={tintColor}
			// 	name="database-search"
			// 	size={25}
			// />
		// ),
		title: 'sdad',
		tabBarIcon: {
			name: 'delete',
			type: 'icon',
		},
		tabBarOptions: {
			activeTintColor: 'green',
			iconStyle: {
				color: 'red'
			},
			inactiveTintColor: 'yellow',
			labelStyle: {
				fontSize: 20
			},
			pressColor: 'red',
			pressOpacity: 80,
			showIcon: true,
			showLabel: false,
			tabStyle: {
				width: 80,
				color: 'yellow'
			},
		}
	};

	render() {
		return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Tab 2 Content</Text>
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
																																								