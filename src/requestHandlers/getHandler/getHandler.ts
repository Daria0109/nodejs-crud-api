import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import { ServerResponse } from 'http';
import { IUser } from '../../types/user';

export const getHandler = (res: ServerResponse, url: string, users: IUser[]) => {
	if (getAppRoute(url) === Routes.USERS) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify(users));
		res.end();
	} else if (getAppRoute(url) === Routes.USER) {
		const urlSegments = url.split('/');
		const userId = urlSegments[urlSegments.length - 1];
		const regex = /^[a-z,0-9-]{36}$/;
		
		if (regex.test(userId)) {
			const requestedUser = users.find((user) => user.id === userId);
			
			if (requestedUser) {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.write(JSON.stringify(requestedUser));
				res.end();
			} else {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'application/json');
				res.write(JSON.stringify({ message: `User with id '${userId}' does not exist` }));
				res.end();
			}
		} else {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			res.write(JSON.stringify({ message: 'Invalid user id is provided' }));
			res.end();
		}
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify({ message: 'Resource is not found' }));
		res.end();
	}
}
