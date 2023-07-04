import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../../types/user';
import { invalidUserId, notFoundError, serverError, userNotExist } from '../../errorHandlers/errorHandlers';
import { getUserIdFromUrl, isValidId } from '../../utils/getUserIdFromUrl';

export const getHandler = (req: IncomingMessage, res: ServerResponse, users: IUser[]) => {
	const { url = '/' } = req;
	req.on('end', () => {
		new Error('error');
		req.on('error', () => {
			serverError(res);
			return;
		});
	});
	
	if (getAppRoute(url) === Routes.USERS) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify(users));
		res.end();
	} else if (getAppRoute(url) === Routes.USER) {
		const userId = getUserIdFromUrl(url);
		
		if (isValidId(userId)) {
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
};
