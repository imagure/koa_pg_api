//routes.test.js
const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
 // do something before anything else run
	console.log('Jest starting!');
});

// close the server after each test
afterAll(() => {
	server.close();
	console.log('server closed!');
});

describe('home root route tests', () => {
	test('GET /', async () => {
		const response = await request(server).get('/');
		expect(response.status).toEqual(200);
		expect(response.text).toContain('Hello from all method');
 	});
});

describe('Invalid route tests', () => {
	test('GET /invalid', async () => {
		const response = await request(server).get('/invalid');
		expect(response.status).toEqual(302); //redirect HTTP code 302
 	});
 	test('GET /not_found', async () => {
		const response = await request(server).get('/not_found');
 		expect(response.status).toEqual(200);
 	});
});

describe('name/id route GET tests', () => {
	test('GET /name/id', async () => {
		const test_name = "Ricardo";
		const test_id = 12345;
		const response = await request(server).get('/'+test_name+'/'+test_id);
		expect(response.status).toEqual(200);
		expect(response.text).toContain('The id for the user ' + test_name + 
									' is ' + test_id);
 	});
});

describe('json_test route GET tests', () => {
	test('GET /json_test', async () => {
		const response = await request(server).get("/json_test");
		expect(response.status).toEqual(200);
		expect(response.type).toEqual("application/json");
		expect(response.body.data).toEqual("Sending some JSON");
		expect(Object.keys(response.body.person)).toEqual(
		expect.arrayContaining(["name", "lastname", "role", "age"])
    );
 	});
});

describe('hello route GET tests', () => {
	test('GET /hello', async () => {
		const response = await request(server).get('/hello');
		expect(response.status).toEqual(200);
		expect(response.text).toContain('Hello, your message has reached the bottom of the cascade');
 });
});

describe('hello route POST tests', () => {
	test('Failing POST /hello', async () => {
 		const response = await request(server).post('/hello');
		 expect(response.status).toEqual(404);
	});

	test('Success POST /hello', async () => {
		 const test_name = "Ricardo";
		 const reqBody = {name: test_name};
		 const response = await request(server).post('/hello').send(reqBody);
		 expect(response.status).toEqual(200);
		 expect(response.text).toContain('Hello, ' + test_name + ', your message has reached the bottom of the cascade');
	});
});
