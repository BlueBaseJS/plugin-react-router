// import { exact } from "prop-types";

// // interface NavigationOptions {
// //   /**
// //    * React's key used by some navigators. No need to specify these manually,
// //    * they will be defined by the router.
// //    */
// // 	key: string;
// //   /**
// //    * Index that represents the depth of the stack
// //    */
// // 	index: number;
// //   /**
// //    * For example 'Home'.
// //    * This is used as a key in a route config when creating a navigator.
// //    */
// // 	routeName: string;
// //   /**
// //    * Path is an advanced feature used for deep linking and on the web.
// //    */
// // 	path?: string;
// //   /**
// //    * Params passed to this route when navigating to it,
// //    * e.g. `{ car_id: 123 }` in a route that displays a car.
// //    */
// // 	params?: Params;
// //   /**
// //    * Array containing the navigator's routes
// //    */
// // 	routes: NavigationRoute[];
// // }

// // interface RouteConfigs {

// //   // `ProfileScreen` is a React component that will be the main content of the screen.
// //   screen: ProfileScreen,
// //   // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

// //   // Optional: When deep linking or using react-navigation in a web app, this path is used:
// //   path: 'people/:name',
// //   // The action and route params are extracted from the path.

// //   // Optional: Override the `navigationOptions` for the screen
// //   navigationOptions: ({ navigation }) => ({
// //     title: `${navigation.state.params.name}'s Profile'`,;
// //   }),

// // }





// // Router Component: createApp

// /**
//  *
//  * 1. RouterContainer // RouterProvider:
//  * - React Navigation: createAppContainer, createBrowserContainer
//  * - React Router: MemoryRouter, BrowserRouter
//  *
//  * 2. Navigator Component:
//  * - React Navigation: createSwitchNavigator, createStackNavigator
//  * - React Router: Switch
//  *
//  * - - Route Component:
//  * - - Rendered by Navigator
//  *
//  * 3. Link Component
//  *
//  * 4. Redirect?
//  */

// interface RouterProviderProps {
// }

// interface NavigatorProps {

// 	type: 'switch' | 'stack' | string,

// 	routes: Array<{
// 		screen: React.ComponentType<any>,
// 		getScreen: () => React.ComponentType<any>,
// 		navigationOptions?: NavigationScreenConfig<any>;
//     path?: string;
// 	}>,




// 	initialRouteName?: string;
//   initialRouteParams?: NavigationParams;
//   paths?: NavigationPathsConfig;
//   defaultNavigationOptions?: NavigationScreenConfig<NavigationScreenOptions>;
//   navigationOptions?: NavigationScreenConfig<NavigationScreenOptions>;
//   initialRouteKey?: string;
// }



















// export interface NavigationStackScreenOptions {
//   title?: string;
//   header?:
//   | React.ReactElement<any>
//   | ((headerProps: HeaderProps) => React.ReactElement<any>)
//   | null;
//   headerTransparent?: boolean;
//   headerTitle?: string | React.ReactElement<any>;
//   headerTitleStyle?: StyleProp<TextStyle>;
//   headerTitleAllowFontScaling?: boolean;
//   headerTintColor?: string;
//   headerLeft?:
//   | React.ReactElement<any>
//   | ((backButtonProps: HeaderBackButtonProps) => React.ReactElement<any>)
//   | null;
//   headerBackTitle?: string | null;
//   headerBackImage?: React.ReactElement<any>;
//   headerTruncatedBackTitle?: string;
//   headerBackTitleStyle?: StyleProp<TextStyle>;
//   headerPressColorAndroid?: string;
//   headerRight?: React.ReactElement<any> | null;
//   headerStyle?: StyleProp<ViewStyle>;
//   headerForceInset?: HeaderForceInset;
//   headerBackground?: React.ReactNode | React.ReactType;
//   gesturesEnabled?: boolean;
//   gestureResponseDistance?: { vertical?: number; horizontal?: number };
//   gestureDirection?: 'default' | 'inverted';
// }









// // tslint:disable: object-literal-sort-keys

// const navigator = {
// 	navigator: 'switch',
// 	initialRouteName: 'Home',
// 	routes: [{
// 		path: '/',
// 		exact: true,
// 		navigator: 'stack',
// 		name: 'Home',
// 		component: 'HomeScreen',
// 		navigationOptions: {},
// 		filter: 'bluebase.routes.main',
// 		routes: {}
// 	}]
// }	


// export interface RouteConfig {
// 	navigator?: 'switch' | 'stack' | string,
// 	name: string,
// 	path: string,
// 	exact?: boolean,
// 	component: React.ComponentType<any>,
// 	navigationOptions?: any,
// 	routes?: RouteConfig[]

// 	[key: string]: any,
// }


// export interface RouterProps {
// 	routes: RouteConfig,
// 	initialRoute?: string,

// 	[key: string]: any,
// }


// <Router routes={} />