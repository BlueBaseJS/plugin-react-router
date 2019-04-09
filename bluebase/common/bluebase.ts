import DemoApp from '../../src/demo';
// import MaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../src';

// This file contain all the apps, plugins and configuration which are required
// for booting bluebase. see https://blueeast.gitbooks.io/bluebase/
export default {

	plugins: [
		// MaterialUI,
		Plugin,
		DemoApp
	]
};
