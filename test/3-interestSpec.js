import chai from 'chai';
import chaiHttp from 'chai-http';
import * as migrate from '../app/models/dbModel';
import app from '../app/server';

/** Use chai expect for tdd and http for handling request */

const expect = chai.expect;

chai.use(chaiHttp);

/**
*@param {object} testParty1

*/
const data = {
  email: 'admin01@gmail.com',
  password: 'josh20111',
};

const data2 = {
  email: 'basilcea@gmail.com',
  password: 'chijind1',
};

const data3 = {
    firstname: 'basl',
    lastname: 'cea',
    othername: 'chij',
    email: 'basil@gmail.com',
    phoneNumber: '09087211591',
    passportUrl: 'http:105/v3',
    password: 'chijind1',
    confirmPassword: 'chijind1',
    registerAs: 'politician',
  };

let admintoken;
let usertoken;
let anotherusertoken;
before(
  async () => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer null')
        .send(data)
          .end((err, res) => {
            console.log(res.body)
          admintoken = res.body.data[0].token;
        });
    } catch (err) {
      console.log(err.toString());
    }
  },
);
before(
  async () => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer null')
        .send(data2)
        .end((err, res) => {
          usertoken = res.body.data[0].token;
        });
    } catch (err) {
      console.log(err.toString());
    }
  },
);
before(
    async () => {
      try {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .set('Authorization', 'Bearer null')
          .send(data3)
          .end((err, res) => {
            anotherusertoken = res.body.data[0].token;
          });
      } catch (err) {
        console.log(err.toString());
      }
    },
);

const testInterest = {
    office: 1,
    party:2
}
  

describe('POST /interests', () => {
    it('should fail if user is not a politician', (done) => {
      chai
        .request(app)
        .post('/api/v1/interests')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(testInterest)
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
    it('should pass', (done) => {
      chai
        .request(app)
        .post('/api/v1/interests')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .send(testInterest)
          .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
              expect(res.body.data).to.have.keys('id', 'office', 'party', 'interest');
              done();
        });
    });
    it('should fail if interest already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/interests')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .send(testInterest)
          .end((err, res) => {
        console.log(res.body)
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
  });