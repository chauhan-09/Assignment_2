const request = require('supertest');
const express = require('express');
const app = express(); 
const userRoutes = require('../routes/userRoutes');
const userModel = require('../models/userModel');

app.use(express.json()); 
app.use('/users', userRoutes); 

describe('User API', () => {
  let token = '';

  beforeAll(async (done) => {
    const credentials = {
      username: 'testuser',
      password: 'testpassword'
    };

    const response = await request(app)
      .post('/login')
      .send(credentials);

    token = response.body.token;
    done();
  });

  test('POST /users - should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    };

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username', newUser.username);
  });

  test('GET /users/:id - should get a user by ID', async () => {
    const userId = 1;

    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id', userId);
  });

  test('POST /login - should authenticate user and generate JWT token', async () => {
    const credentials = {
      username: 'testuser',
      password: 'testpassword'
    };

    const response = await request(app)
      .post('/login')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('token');
  });
});
