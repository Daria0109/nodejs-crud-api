import { ServerResponse } from 'http';

export const serverError = (res: ServerResponse) => {
	res.statusCode = 500;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Internal server error' }));
	res.end();
};

export const notFoundError = (res: ServerResponse) => {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Resource is not found' }));
	res.end();
};

export const invalidUserId = (res: ServerResponse) => {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Invalid user id is provided' }));
	res.end();
};

export const userNotExist = (res: ServerResponse, userId: string) => {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: `User with id '${userId}' does not exist` }));
	res.end();
};

export const invalidRequestData = (res: ServerResponse) => {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Invalid data provided' }));
	res.end();
};
