import request from 'supertest';
import app from '../index'

describe('Auth Routes', () => {
	it ('should return 200 for a successful login', async () => {
		const response = await request(app)
		.post('/api/v1/user/auth/login')
		.send({
			email: 'gangi.keshav03@gmail.com',
			password: 'akshat_123'
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
	})

	it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });
})
