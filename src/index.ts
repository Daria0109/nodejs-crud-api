import * as http from 'http';

// GET api/users is used to get all persons
// Server should answer with status code 200 and all users records

const port = 3000;

const server = http.createServer((request, response) => {
	const { method, url,  } = request;
	console.log('method', method)
	console.log('url', url)
	
	let body: any = [];
	request.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		console.log('body', body)
	});
	
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Hello World');
});

server.listen(port, () => {
	console.log(`Server running at localhost`);
});
