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
    office: 2,
    party: 2,
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
          console.log(res.body);
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
          console.log(res.body);
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
        .post('/api/v1/offices/4/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          console.log(res.body);
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
        .post('/api/v1/offices/7/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send({ office: 10, party: 2 })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          done();
        });
    });
    /*
    it('should pass ', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/7/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data').which.is.an('object');
          expect(res.body.data).to.have.keys('office', 'candidate', 'party');
          done();
        });
    });*/
    it('should fail if candidate already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices/1/register')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testCandidate)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(422);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });

    });
  });
});
