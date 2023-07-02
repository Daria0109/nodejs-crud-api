import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../../types/user';
import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import { invalidRequestData, notFoundError } from '../../errorHandlers/errorHandlers';
import { addUser } from '../serverRequestsHandlers';

const { randomUUID } = await import('node:crypto');

export const postHandler = (req: IncomingMessage, res: ServerResponse) => {
	const { url = '/' } = req;
	
	if (getAppRoute(url) === Routes.USERS) {
		let reqBody: any = [];
		
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
				const resData = { ...reqUser, id: randomUUID() };
				addUser(resData);
				
				res.statusCode = 201;
				res.setHeader('Content-Type', 'application/json');
				res.write(JSON.stringify(resData));
				res.end();
			} else {
				invalidRequestData(res);
			}
		});
	} else {
		notFoundError(res);
	}
}
