import request from 'supertest';
import app from '../index';

describe('GET /', () => {
    it('responds with 200', (done) => {
        request(app).get('/').expect(200, done);
    });
});
