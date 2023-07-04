import { IncomingMessage, ServerResponse } from 'http';
import { getAppRoute } from '../../utils/getAppRoute';
import { Routes } from '../../types/enums/routes';
import { invalidRequestData, notFoundError } from '../../errorHandlers/errorHandlers';
import { addUser } from '../serverRequestsHandlers';
import { randomUUID } from 'crypto';

export const postHandler = (req: IncomingMessage, res: ServerResponse) => {
	const { url = '/' } = req;

	if (getAppRoute(url) === Routes.USERS) {
		const reqBody: Buffer[] = [];
		
		req.on('data', (chunk) => {
			reqBody.push(chunk);
		});
		
		req.on('end', () => {
			const reqBodyEnd = Buffer.concat(reqBody);
			const reqUser = JSON.parse(reqBodyEnd.toString());
			
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
};
