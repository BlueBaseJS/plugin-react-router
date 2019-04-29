import { NavigationOptions } from '@bluebase/components';

export function getTitle(options: NavigationOptions = {}) {
	return (options as any).tabBarLabel || options.title || options.headerTitle;
}

export function getIcon(options: NavigationOptions = {}) {
	const icon = (options as any).tabBarIcon;

	if (!icon) {
		return;
	}

	if (typeof icon === 'function') {
		return icon();
	}

	if (icon && typeof icon.type === 'string') {
		return icon;
	}
}