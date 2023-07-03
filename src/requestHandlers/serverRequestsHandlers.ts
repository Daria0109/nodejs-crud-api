import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../types/user';
import { HTTPMethods } from '../types/enums/methods';
import { getHandler } from './getHandler/getHandler';
import { serverError } from '../errorHandlers/errorHandlers';
import { postHandler } from './postHandler/postHandler';
import { putHandler } from './putHandler/putHandler';
import { deleteHandler } from './deleteHandler/deleteHandler';

let users: IUser[] = [];
export const addUser = (data: IUser) => {
	users.push(data);
};

export const updateUser = (userId: string, data: IUser) => {
	users = users.map((user) => (
		user.id === userId ? { ...data } : user
	));
};

export const deleteUser = (userId: string) => {
	users = users.filter((user) => user.id !== userId);
};

export const serverRequestsHandlers = (req: IncomingMessage, res: ServerResponse) => {
	const { method } = req;
	console.log('users', users);
	switch (method) {
		case HTTPMethods.GET:
			getHandler(req, res, users);
			break;
		case HTTPMethods.POST:
			postHandler(req, res);
			break;
		case HTTPMethods.PUT:
			putHandler(req, res, users);
			break;
		case HTTPMethods.DELETE:
			deleteHandler(req, res, users);
			break;
		
		default:
			serverError(res);
	}
};
