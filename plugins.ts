import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginLauncher from '@bluebase/plugin-launcher';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import BlueBasePluginSettingsApp from '@bluebase/plugin-settings-app';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';

import Plugin from './src';

export const plugins = [
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginLauncher,
	BlueBasePluginMaterialUI,
	BlueBasePluginResponsiveGrid,
	MaterialCommunityIcons,
	Plugin,
	BlueBasePluginSettingsApp,
];
