'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E - same request', () => {
  let response;

  describe('GET', () => {
    it('returns proper scenario', async () => {
      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .post('/__scenario')
          .send({ id: '1' });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ id: '1' });

      response = await request(app)
          .get('/two/common/scenarios');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        scenario: '1'
      });

      response = await request(app)
          .post('/__scenario')
          .send({ id: '2' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ id: '2' });

      response = await request(app)
          .get('/two/common/scenarios');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        scenario: '2'
      });

      response = await request(app)
          .post('/__scenario/reset');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .post('/__scenario')
          .send({ id: '2', path: '/two/common/scenarios' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ idMap: { '/two/common/scenarios': '2' } });

      response = await request(app)
          .post('/__scenario/reset')
          .send({ path: '/two/common/scenarios' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .post('/__scenario')
          .send({ id: '1', path: '/path/1' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .post('/__scenario')
          .send({ id: '2', path: '/path/2' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        'idMap': {
          '/path/1': '1',
          '/path/2': '2'
        }
      });

      response = await request(app)
          .get('/__scenario/reset-all');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});
    });
  });

  describe('POST', () => {
    it('returns proper scenario', async () => {
      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .post('/__scenario')
          .send({ id: '3' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ id: '3' });

      response = await request(app)
          .post('/two/common/scenarios')
          .send({ firstName: 'Mateo' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        scenario: '3'
      });

      response = await request(app)
          .post('/__scenario')
          .send({ id: '4' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ id: '4' });

      response = await request(app)
          .post('/two/common/scenarios')
          .send({ firstName: 'Mateo' });
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        scenario: '4'
      });

      response = await request(app)
          .post('/__scenario/reset');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});

      response = await request(app)
          .get('/__scenario');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({});
    });
  });
});
