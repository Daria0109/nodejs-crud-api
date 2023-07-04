import { Routes } from '../types/enums/routes';

export const getAppRoute = (url: string) => {
	const baseRoute = Routes.USERS;
	let route = url.endsWith('/') ? url.slice(0, -1) : url;
	
	if (route === baseRoute) {
		return baseRoute;
	} else if (route.startsWith(`${baseRoute}/`)) {
		const path = route.slice(`${baseRoute}/`.length);
		const pathSegments = path
			.split('/')
			.filter((segment) => Boolean(segment));
		
		if (pathSegments.length === 1) {
			route = `${baseRoute}/:id`;
		}
	}
	
	return route;
};
