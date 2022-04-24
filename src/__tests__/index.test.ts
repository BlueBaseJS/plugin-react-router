import { BlueBase } from '@bluebase/core';

import Plugin from '../index';
import MemoryRouter from '../memory-router';
import StaticRouter from '../static-router';

test('Plugin should be correctly registered', async () => {
	const BB = new BlueBase();
	await BB.Plugins.register(Plugin);

	expect(BB.Plugins.has('@bluebase/plugin-react-router')).toBeTruthy();
});

test('memory-router Plugin should be correctly registered', async () => {
	const BB = new BlueBase();
	await BB.Plugins.register(MemoryRouter);

	expect(BB.Plugins.has('@bluebase/plugin-react-router')).toBeTruthy();
});

test('static-router Plugin should be correctly registered', async () => {
	const BB = new BlueBase();
	await BB.Plugins.register(StaticRouter);

	expect(BB.Plugins.has('@bluebase/plugin-react-router')).toBeTruthy();
});
