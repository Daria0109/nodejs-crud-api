import 'dotenv/config';
import * as http from 'http';
import { serverRequestsHandlers } from './requestHandlers/serverRequestsHandlers';
import { IUser } from './types/user';

const port = process.env.PORT || 4000;

let users: IUser[] = [];
export const addUser = (data: IUser) => {
	users.push(data);
}

export const updateUser = (userId: string, data: IUser) => {
	users = users.map((user) => (
		user.id === userId ? { ...data } : user
	));
}

export const deleteUser = (userId: string) => {
	users = users.filter((user) => user.id !== userId);
}

const server = http.createServer((req, res) => {
	console.log(users);
	serverRequestsHandlers(req, res, users);
});

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
