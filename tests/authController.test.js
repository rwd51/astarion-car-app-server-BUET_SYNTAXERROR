//requirements
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

// New Registration Test
test('New Registration Test', async () => {
    const registrationData = {
        userId: '123456',
        name: 'John Doe',
        address: '123 Main St',
        password: 'password123'
    };

    const response = await request.post('/api/auth/register').send(registrationData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Registration successful');
});

// Login Test
test('Login Test', async () => {
    const loginCredentials = {
        userId: '123456',
        password: 'password123'
    };

    const response = await request.post('/api/auth/login').send(loginCredentials);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
});

// Duplicate Registration Test
test('Duplicate Registration Test', async () => {
    const registrationData = {
        userId: '123456',
        name: 'John Doe',
        address: '123 Main St',
        password: 'password123'
    };

    const response = await request.post('/api/auth/register').send(registrationData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
});
