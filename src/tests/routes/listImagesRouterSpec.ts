import request from 'supertest';
import app from '../../index';

describe('GET /api/listImages', () => {
    it('responds with 200', (done) => {
        request(app).get('/api/listImages').expect(200, done);
    });
});
