import { NavigationOptions } from '@bluebase/components';

export const getTitle = (options: NavigationOptions = {}) => {
	return (options as any).drawerLabel || options.title || options.headerTitle;
};

export const getIcon = (options: NavigationOptions = {}) => {
	const icon = (options as any).drawerIcon;

	if (!icon) {
		return;
	}

	if (typeof icon === 'function') {
		return icon();
	}

	if (icon && typeof icon.type === 'string') {
		return icon;
	}
};
