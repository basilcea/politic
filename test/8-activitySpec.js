/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as migrate from '../app/models/dbModel';
import app from '../app/server';

/** Use chai expect f./1-userSpecttp for handling request */

const expect = chai.expect;

chai.use(chaiHttp);
let usertoken;
let anotherusertoken;
describe('Test user activity endpoints', () => {
  const data2 = {
    email: 'basilcea@gmail.com',
    password: 'chijind1',
  };

  const data3 = {
    email: 'basil@gmail.com',
    password: 'chijind1',
  };

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'Bearer null')
      .send(data2)
      .end((err, res) => {
        usertoken = res.body.data[0].token;
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'Bearer null')
      .send(data3)
      .end((err, res) => {
        anotherusertoken = res.body.data[0].token;
        done();
      });
  });
  describe('GET /users/me', () => {
    it('should pass', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data').which.is.an('object');
          expect(res.body.data).to.include.keys('firstname', 'lastname', 'othername', 'email', 'registeras', 'phonenumber', 'passporturl');
          done();
        });
    });
  });
  describe('GET /users/me/votes', () => {
    it('should fail no activity exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/votes')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status').which.is.equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if user exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/votes')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          expect(res.body.data[0]).to.have.keys('id', 'createdon', 'createdby', 'office', 'candidate');
          done();
        });
    });
  });
  describe('PATCH /users/me/password', () => {
    it('should fail if old password is incorrect', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ oldPassword: 'chijind123', newPassword: 'chijind140', confirmPassword: 'chijind140' })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('status').which.is.equal(422);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ oldPassword: 'chijind1', newPassword: 'chijind140', confirmPassword: 'chijind140' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          done();
        });
    });
  });
});
