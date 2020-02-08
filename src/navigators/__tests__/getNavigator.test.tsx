import { getNavigator } from '..';

describe('getNavigator', () => {
	it('should return undefined for unknown navigators', async () => {
		const opts = getNavigator('foo');

		expect(opts).toBeUndefined();
	});

	it('should return stack navigator if no type is defined', async () => {
		const opts = getNavigator();

		expect(opts).toBeTruthy();
	});

	it('should return a navigator for a known type', async () => {
		const opts = getNavigator('drawer');

		expect(opts).toBeTruthy();
	});
});
