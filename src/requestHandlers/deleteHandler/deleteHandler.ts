import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../../types/user';
import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import { invalidUserId, notFoundError, userNotExist } from '../../errorHandlers/errorHandlers';
import { deleteUser } from '../serverRequestsHandlers';

export const deleteHandler = (req: IncomingMessage, res: ServerResponse, users: IUser[]) => {
	const { url = '/' } = req;
	
	if (getAppRoute(url) === Routes.USER) {
		const urlSegments = url.split('/');
		const userId = urlSegments[urlSegments.length - 1];
		const regex = /^[a-z,0-9-]{36}$/;
		
		if (regex.test(userId)) {
			const requestedUser = users.find((user) => user.id === userId);
			
			if (!requestedUser) {
				userNotExist(res, userId);
				return;
			}
			
			deleteUser(userId);
			
			res.statusCode = 204;
			res.setHeader('Content-Type', 'application/json');
			res.write(JSON.stringify({ message: 'User is deleted' }));
			res.end();
		} else {
			invalidUserId(res);
		}
	} else {
		notFoundError(res);
	}
}
