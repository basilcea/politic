import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/server';

/** Use chai expect for tdd and http for handling request */

const expect = chai.expect;

chai.use(chaiHttp);

/**
*@param {object} testParty1

*/
describe('Test interest endpoints', () => {
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
      });

    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'Bearer null')
      .send(data3)
      .end((err, res) => {
        anotherusertoken = res.body.data[0].token;
        done()
      });
  });

  const testInterest = {
    office: 1,
    party: 2,
  };


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
          console.log(res.body.data);
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
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
  });

  describe('Patch /interests/<interest-id>', () => {
    const testInterest2 = {
      office: '2',
    };

    it('should fail if interest does not exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/interests/8')
        .send(testInterest2)
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res.body).to.have.status(404);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          expect(res.body.status).to.equal(404);
          done();
        });
    });
    it('should pass if interest exists', (done) => {
      chai
        .request(app)
        .patch('/api/v1/interests/3')
        .send(testInterest2)
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          console.log(res.body)
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').which.is.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'office', 'party', 'interest');
          expect(res.body.data.office).to.be.equal(2);
          done();
        });
    });

  });

  describe('GET /interests', () => {

    it('should pass if user is an admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/interests')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res.body).to.have.status(200);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          expect(res.body.data[0]).to.have.keys('interestId', 'office', 'party', 'passport', 'user', 'username');
          done();
        });
    });
    it('should fail if user has no expressed interest', (done) => {
      chai
        .request(app)
        .get('/api/v1/interests')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status').which.is.equal(401);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });

    it('should pass if user expressed interest', (done) => {
      chai
        .request(app)
        .get('/api/v1/interests')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys('id', 'office', 'party', 'interest');
          done();
        });
    });

  });

  describe('Delete /interests/<party-id>', () => {
    it('should fail if interest does not exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/interests/10')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res.body).to.have.status(404);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          expect(res.body.status).to.equal(404);
          done();
        });
    });
    it('should delete if expressed interest exists by user', (done) => {
      chai
        .request(app)
        .delete('/api/v1/interests/3')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.equal('interests deleted succesfully');
          done();
        });
    });
  });

});
