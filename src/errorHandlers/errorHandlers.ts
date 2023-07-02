import { ServerResponse } from 'http';

export const serverError = (res: ServerResponse) => {
	res.statusCode = 500;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify({ message: 'Internal server error' }));
	res.end();
}