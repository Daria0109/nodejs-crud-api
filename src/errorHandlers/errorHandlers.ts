import { ServerResponse } from 'http';

export const serverError = (res: ServerResponse) => {
	res.statusCode = 500;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Internal server error' }));
	res.end();
}

export const notFoundError = (res: ServerResponse) => {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Resource is not found' }));
	res.end();
};
