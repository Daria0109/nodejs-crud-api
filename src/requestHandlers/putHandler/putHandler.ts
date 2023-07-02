import { IncomingMessage, ServerResponse } from 'http';
import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import {
	invalidRequestData,
	invalidUserId,
	notFoundError,
	userNotExist
} from '../../errorHandlers/errorHandlers';
import { IUser } from '../../types/user';
import { updateUser } from '../serverRequestsHandlers';

export const putHandler = (req: IncomingMessage, res: ServerResponse, users: IUser[]) => {
	const { url = '/' } = req;
	
	if (getAppRoute(url) === Routes.USER) {
		const urlSegments = url.split('/');
		const userId = urlSegments[urlSegments.length - 1];
		const regex = /^[a-z,0-9-]{36}$/;
		
		if (regex.test(userId)) {
			const requestedUser = users.find((user) => user.id === userId);
			let reqBody: any = [];
			
			if (!requestedUser) {
				userNotExist(res, userId);
				return;
			}
			
			req.on('data', (chunk) => {
				reqBody.push(chunk);
			});
			
			req.on('end', () => {
				reqBody = Buffer.concat(reqBody);
				console.log('reqBody', reqBody.toString())
				const reqUser = JSON.parse(reqBody.toString());
				
				if (
					typeof reqUser?.username === 'string'
					&& typeof reqUser?.age === 'number'
					&& Array.isArray(reqUser?.hobbies)
				) {
					const resData = { ...requestedUser, ...reqUser };
					updateUser(userId, resData);
					
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.write(JSON.stringify(resData));
					res.end();
				} else {
					invalidRequestData(res);
				}
			});
			
			
		} else {
			invalidUserId(res);
		}
		
	} else {
		notFoundError(res);
	}
}
