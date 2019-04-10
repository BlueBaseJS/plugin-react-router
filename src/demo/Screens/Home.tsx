import { Divider, ListItem, ListSection, ListSubheader } from '@bluebase/components';
import { ScrollView, StatusBar, View } from 'react-native';
import React from 'react';
// tslint:disable: jsx-no-lambda max-line-length

export class HomeScreen extends React.Component<any> {
	render() {
		return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
				<ScrollView style={{ flex: 1 }}>
					<ListSection>
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
						/>
						<Divider />
						<ListItem
							title="Bottom Tabs"
							onPress={() => this.props.navigation.navigate('SettingsBottomTabs')}
						/>
						<Divider />
						<ListItem
							title="Drawer"
							onPress={() => this.props.navigation.navigate('SettingsDrawer')}
						/>
						<Divider />
					</ListSection>
				</ScrollView>
      </View>
		);
	}
}
