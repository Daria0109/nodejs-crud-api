import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../types/user';
import { HTTPMethods } from '../types/enums/methods';
import { getHandler } from './getHandler/getHandler';
import { serverError } from '../errorHandlers/errorHandlers';

export const serverRequestsHandlers = (req: IncomingMessage, res: ServerResponse) => {
	const { method, url = '/' } = req;
	let users: IUser[] = [];
	console.log('url', url);
	
	switch (method) {
		case HTTPMethods.GET:
			getHandler(res, url, users);
			break;
		
		default:
			serverError(res);
	}
};