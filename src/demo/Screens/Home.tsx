import { Divider, List, ListItem, ListSubheader } from '@bluebase/components';
import { ScrollView, StatusBar, View } from 'react-native';
import React from 'react';
// tslint:disable: jsx-no-lambda max-line-length

export class HomeScreen extends React.Component<any> {
	render() {
		return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
				<ScrollView style={{ flex: 1 }}>
					<List>
						<ListSubheader>Navigators</ListSubheader>
						<Divider />
						<ListItem
							title="Stack Navigator"
							description="Provides a way for your app to transition between screens where each new screen is placed on top of a stack."
							onPress={() => this.props.navigation.navigate('Settings')}
						/>
						<Divider />
						<ListItem
							title="Switch Navigator"
							description="The purpose of SwitchNavigator is to only ever show one screen at a time."
							onPress={() => this.props.navigation.navigate('Switch')}
						/>
						<Divider />
						<ListItem
							title="Tabs"
							onPress={() => this.props.navigation.navigate('SettingsTabs')}
							description="A tab bar on the top of the screen that lets you switch between different routes by tapping the route or swiping horizontally. "
						/>
						<Divider />
						<ListItem
							title="Bottom Tabs"
							description="A simple tab bar on the bottom of the screen that lets you switch between different routes."
							onPress={() => this.props.navigation.navigate('SettingsBottomTabs')}
						/>
						<Divider />
						<ListItem
							title="Drawer"
							description="Navigation drawers provide access to destinations in your app."
							onPress={() => this.props.navigation.navigate('SettingsDrawer')}
						/>
						<Divider />
					</List>
				</ScrollView>
      </View>
		);
	}
}
