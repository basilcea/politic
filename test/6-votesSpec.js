/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/server';

/** Use chai expect for tdd and http for handling request */

const expect = chai.expect;

chai.use(chaiHttp);

/**
*@param {object} testParty1

*/

describe('Test votes endpoints', () => {
  const data2 = {
    email: 'basil@gmail.com',
    password: 'chijind1',
  };
  let usertoken;
  // eslint-disable-next-line no-unused-vars
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'Bearer null')
      .send(data2)
      .end((err, res) => {
        usertoken = res.body.data[0].token;
        done();
      });
  });
  describe('POST /votes', () => {
    it('should fail if candidate does not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/votes')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ office: 1, candidate: 4 })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status').which.is.a('number').equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if candidate exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/votes')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ office: 1, candidate: 1 })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').which.is.a('number').equal(201);
          expect(res.body).to.have.property('data').which.is.an('object').with.keys('office', 'candidate', 'voter');
          done();
        });
    });
    it('should fail if you have voted for candidate already', (done) => {
      chai
        .request(app)
        .post('/api/v1/votes')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ office: 1, candidate: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status').which.is.a('number').equal(400);
          expect(res.body).to.have.property('error').which.is.a('string');
          done()
        });
    });
  });
  describe('GET /offices/<office-id>/ candidates', () => {
    it('should fail if office does not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/4/result')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status').which.is.a('number').equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if office exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices/1/result')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          console.log(res.body)
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.a('number').equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          expect(res.body.data[0]).to.have.keys('office', 'candidate', 'result');
          done();
        });
    });
  });
});
