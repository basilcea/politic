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
describe('Test candidates endpoints', () => {
  const data = {
    email: 'admin01@gmail.com',
    password: 'josh20111',
  };

  const data2 = {
    email: 'basil@gmail.com',
    password: 'chijind1',
  };

  const testCandidate = {
    office: 1,
    party: 1,
  };
  let admintoken;
  let usertoken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'Bearer null')
      .send(data)
      .end((err, res) => {
        admintoken = res.body.data[0].token;
      });

    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'Bearer null')
      .send(data2)
      .end((err, res) => {
        usertoken = res.body.data[0].token;
        done();
      });
  });
  describe('POST /offices/id/register', () => {
    it('should fail if user is not an admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/7/register')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(testCandidate)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(401);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          done();
        });
    });
    it('should fail if user is not found', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/10/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          done();
        });
    });
    it('should fail if user has not expressed interest', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/1/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          done();
        });
    });
    it('should fail if office is not found', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/4/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send({ office: 10, party: 1 })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('should pass ', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/4/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data').which.is.an('object');
          expect(res.body.data).to.have.keys('id', 'office', 'candidate', 'party');
          done();
        });
    });
    it('should fail if candidate already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/4/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(422);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
  });
  describe('GET /offices/<office-id>/candidates', () => {
    it('should fail if no candidate exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices/10/candidates')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {

          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if candidates exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices/1/candidates')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.a('number').equal(200);
          expect(res.body).to.have.property('data').which.is.an('array')
          expect(res.body.data[0]).to.be.an('object').with.keys('office', 'user', 'username', 'passport', 'party', 'partyname', 'logo');
          done();
        });
    });
  });
  describe('GET /candidates/user/<candidate-id>', () => {
    it('should fail if no candidate exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/candidates/user/2')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          console.log(res.body)
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if candidate exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/candidates/user/1')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.a('number').equal(200);
          expect(res.body).to.have.property('data').which.is.an('array')
          expect(res.body.data[0]).to.be.an('object').with.keys('officeName', 'id', 'username', 'passport', 'party', 'partyname', 'logo');
          done();
        });
    });
  });
  describe('GET /candidates/<user-id>', () => {
    it('should fail if no candidate exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/candidates/2')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if candidate exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/candidates/4')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.a('number').equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          expect(res.body.data[0]).to.be.an('object').with.keys('id', 'office', 'party', 'candidate');
          done();
        });
    });
  });
  describe('PATCH /candidates/<candidate-id>', () => {
    it('should fail if user is not an admin', (done) => {
      chai
        .request(app)
        .patch('/api/v1/candidates/4')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(401);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should fail if candidate does not exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/candidates/2')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });

    it('should pass if candidate exists', (done) => {
      chai
        .request(app)
        .patch('/api/v1/candidates/1')
        .set('Authorization', `Bearer ${admintoken}`)
        .send({ office: 1, party: 1 })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').which.is.a('number').equal(201);
          expect(res.body).to.have.property('data').which.is.an('object').with.keys('id', 'office', 'party', 'candidate');
          expect(res.body.data.party).to.equal(1);
          done();
        });
    });
  });
});
