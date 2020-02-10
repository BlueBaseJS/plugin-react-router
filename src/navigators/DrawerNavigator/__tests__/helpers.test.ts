import { getIcon, getTitle } from '../helpers';

describe('DrawerNavigator', () => {
	describe('helpers', () => {
		describe('getTitle', () => {
			it('should return drawerLabel if available', () => {
				expect(
					getTitle({
						drawerLabel: 'Foo',
						title: 'bar',
						headerTitle: 'baz',
					} as any)
				).toBe('Foo');
			});

			it('should return fallback to title if drawerLabel is not available', () => {
				expect(
					getTitle({
						// drawerLabel: 'Foo',
						title: 'bar',
						headerTitle: 'baz',
					})
				).toBe('bar');
			});

			it('should return fallback to headerTitle if drawerLabel & title are not available', () => {
				expect(
					getTitle({
						// drawerLabel: 'Foo',
						// title: 'bar',
						headerTitle: 'baz',
					})
				).toBe('baz');
			});

			it('should return undefined for not params', () => {
				expect(getTitle()).toBeUndefined();
			});
		});

		describe('getIcon', () => {
			it('should return undefined if drawerIcon is not available', () => {
				expect(
					getIcon({
						drawerIcon: undefined,
					} as any)
				).toBe(undefined);
			});

			it('should return as is if drawerIcon is an object', () => {
				expect(
					getIcon({
						drawerIcon: {
							type: 'icon',
							name: 'foo',
						},
					} as any)
				).toMatchObject({
					type: 'icon',
					name: 'foo',
				});
			});

			it('should return execute drawerIcon fn and return result', () => {
				expect(
					getIcon({
						drawerIcon: () => 'foo',
					} as any)
				).toBe('foo');
			});

			it('should return undefined for not params', () => {
				expect(getIcon()).toBeUndefined();
			});
		});
	});
});
