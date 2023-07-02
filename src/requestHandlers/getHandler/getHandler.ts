import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../../types/user';
import { invalidUserId, notFoundError, userNotExist } from '../../errorHandlers/errorHandlers';

export const getHandler = (req: IncomingMessage, res: ServerResponse, users: IUser[]) => {
	const { url = '/' } = req;
	
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
				userNotExist(res, userId);
			}
		} else {
			invalidUserId(res);
		}
	} else {
		notFoundError(res);
	}
}
