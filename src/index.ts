import 'dotenv/config';
import * as http from 'http';
import { serverRequestsHandlers } from './requestHandlers/serverRequestsHandlers';
import { serverError } from './errorHandlers/errorHandlers';

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
	try {
		serverRequestsHandlers(req, res);
	} catch (err) {
		serverError(res);
	}
	
});

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
