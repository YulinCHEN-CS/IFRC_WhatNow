const request = require('supertest');
const app = require('../app'); // app.js file that exports the Express app

/**
 * Test user registration and attempt to register again with the same email
 */
describe('POST /register', () => {
    it('should reject registration when the email exists', async () => {
      // Register a new user
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser2@example.com',
          password: 'password123',
          first_name: 'Unit Test',
          last_name: 'User',
        })
        .expect(201);
  
      // Assert registration success
      expect(res.body).toHaveProperty('message', 'Successfully Registered the account! Please Verify your email.');
      expect(res.body.data).toHaveProperty('email', 'testuser2@example.com');
  
      // Attempt to register again with the same email
      const duplicateRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser2@example.com',
          password: 'password123',
          first_name: 'Unit Test',
          last_name: 'User',
        })
        .expect(400);
  
      // Assert registration failure
      expect(duplicateRes.body).toHaveProperty('message', 'Email already taken');
    });
  });

/**
 * Test user login and attempt to login with an incorrect password
 */
describe('POST /login', () => {
    it('should log in a user with valid credentials', async () => {
      // Log in a user with valid credentials
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser2@example.com',
          password: 'password123',
        })
        .expect(200);
  
      // Assert login success
      expect(res.body).toHaveProperty('status', true);
      expect(res.body).toHaveProperty('message', 'Login Successful');
      expect(res.body.data).toHaveProperty('email', 'testuser2@example.com');
      expect(res.body.tokens).toHaveProperty('access.token');
    });
  
    it('should return an error for incorrect password', async () => {
      // Attempt to login with incorrect password
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser2@example.com',
          password: 'wrongpassword',
        })
        .expect(400);
  
      // Assert login failure
      expect(res.body).toHaveProperty('message', 'Wrong Password!');
    });
  });
  