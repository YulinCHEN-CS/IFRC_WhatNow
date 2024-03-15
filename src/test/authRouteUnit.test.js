const request = require('supertest');
const app = require('../app'); // app.js file that exports the Express app

describe('/api/auth', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
          first_name: 'Unit Test',
          last_name: 'User',
        })
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Successfully Registered the account! Please Verify your email.');
      expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
    });

    it('should return an error for existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
          first_name: 'Unit Test',
          last_name: 'User',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Email already taken');
    });

    it('should return an error for missing required fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@example.com',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', '"password" is required');
    });
  });

  describe('POST /email_exists', () => {
    it('should return true if email exists', async () => {
      const res = await request(app)
        .post('/api/auth/email_exists')
        .send({
          email: 'testuser@example.com',
        })
        .expect(200);

      expect(res.body).toHaveProperty('status', true);
      expect(res.body).toHaveProperty('message', 'Email found!');
    });

    it('should return an error for missing email', async () => {
      const res = await request(app)
        .post('/api/auth/email_exists')
        .send({})
        .expect(400);

      expect(res.body).toHaveProperty('message', '\"email\" is required');
    });
  });

  describe('POST /login', () => {
    it('should log in a user with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(res.body).toHaveProperty('status', true);
      expect(res.body).toHaveProperty('message', 'Login Successful');
      expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
      expect(res.body.tokens).toHaveProperty('access.token');
    });

    it('should return an error for incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Wrong Password!');
    });

    it('should return an error for missing required fields', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', '\"password\" is required');
    });
  });

  describe('POST /logout', () => {
    it('should log out a user and revoke tokens', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .send({
          access_token: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWVlN2IyNS1hYTZjLTQzYWUtODFhMS1jMjI0YjNiNWE0YmUiLCJpYXQiOjE3MTA0NTQ4MjAsImV4cCI6MTcxMDU0MTIyMCwidHlwZSI6ImFjY2VzcyJ9.hBP8P-4-vBPsbR4EypOc3m-djWNj_7FXUP7JxitvsI8"]
        })
        .expect(204);

      expect(res.status).toBe(204);
    });
  });
});