import 'dotenv/config';
import * as http from 'http';
import { serverRequestsHandlers } from './requestHandlers/serverRequestsHandlers';

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
	serverRequestsHandlers(req, res);
});

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
