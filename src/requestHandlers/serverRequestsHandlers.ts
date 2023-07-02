import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../types/user';
import { HTTPMethods } from '../types/enums/methods';
import { getHandler } from './getHandler/getHandler';
import { serverError } from '../errorHandlers/errorHandlers';
import { postHandler } from './postHandler/postHandler';

export const serverRequestsHandlers = (req: IncomingMessage, res: ServerResponse, users: IUser[]) => {
	const { method } = req;
	
	switch (method) {
		case HTTPMethods.GET:
			getHandler(req, res, users);
			break;
		case HTTPMethods.POST:
			postHandler(req, res);
			break;
		
		default:
			serverError(res);
	}
};