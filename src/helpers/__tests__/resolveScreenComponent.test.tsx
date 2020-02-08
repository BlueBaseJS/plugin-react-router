import { BlueBase } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import React from 'react';
import { Text } from 'react-native';
import { resolveScreenComponent } from '..';

describe('resolveScreenComponent', () => {
	it('should resolve component from "component" prop', async () => {
		const Foo = () => <Text>Foo</Text>;

		const BB = new BlueBase();
		await BB.boot({ components: { Foo: { applyStyles: false, value: Foo } } });

		const Component = resolveScreenComponent({ component: 'Foo' } as any, BB);

		expect(Component).toStrictEqual(Foo);
	});

	it('should resolve component from "screen" prop', async () => {
		const Foo = () => <Text>Foo</Text>;

		const BB = new BlueBase();
		await BB.boot({ components: { Foo: { applyStyles: false, value: Foo } } });

		const Component = resolveScreenComponent({ screen: 'Foo' } as any, BB);

		expect(Component).toStrictEqual(Foo);
	});

	it('should Noop component if there is nothing to resolve', async () => {
		const Foo = () => <Text>Foo</Text>;

		const BB = new BlueBase();
		await BB.boot({ components: { Foo: { applyStyles: false, value: Foo } } });

		const Component = resolveScreenComponent({} as any, BB);

		expect(String(Component)).toBe(String(BB.Components.resolveFromCache(Noop)));
	});
});
