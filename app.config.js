let VERSION = '1.0.0', VERSION_NUMBER = 100000000;

try {
	const data = require('./dist/version');

	VERSION = data.VERSION;
	VERSION_NUMBER = data.VERSION_NUMBER;
} catch (e) {
	//
}

export default {
	name: 'BlueBase Boilerplate',
	slug: 'plugin-boilerplate',
	description: '🍛 A boilerplate to create BlueBase plugins or apps',
	version: VERSION,
	githubUrl: 'https://github.com/BlueBaseJS/plugin-boilerplate',
	orientation: 'portrait',
	icon: './assets/icon.png',
	entryPoint: './node_modules/expo/AppEntry.js',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'cover',
		backgroundColor: '#ffffff'
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: [
		'**/*'
	],
	ios: {
		supportsTablet: true
	},
	android: {
		versionCode: VERSION_NUMBER,
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF'
		}
	},
	web: {
		favicon: './assets/favicon.png'
	},
	extra: {
		storybookNative: process.env.NODE_ENV === 'STORYBOOK_NATIVE'
	}
};
