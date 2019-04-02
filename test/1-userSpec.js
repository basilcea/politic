import chai from 'chai';
import chaiHttp from 'chai-http';
import * as migrate from '../app/models/dbModel';
import app from '../app/server';

chai.use(chaiHttp);
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
describe('Test user endpoints', () => {

  let usertoken;
  const data = {
    firstname: 'basil',
    lastname: 'cea',
    othername: 'chij',
    email: 'basilc@gmail.com',
    phoneNumber: '09087211595',
    passportUrl: 'http:105/v3',
    password: 'chijind1',
    confirmPassword: 'chijind1',
    registerAs: 'voter',
  };

  before(async function () {
    try {
      this.timeout(1000000);
      await migrate.createAllTables();
    } catch (err) {
      console.log(err.toString());
    }
  });

  describe('POST /auth/signup', () => {
    it('should pass if data format is correct', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys('token', 'user');
          expect(res.body.data[0].token).to.be.a('string');
          expect(res.body.data[0].user).to.be.an('object');
          expect(res.body.data[0].user).to.include.keys('firstname', 'email', 'phonenumber', 'passporturl', 'password', 'registeras', 'isadmin');
          usertoken = res.body.data[0].token;
          done();
        });

    });
  });

  describe('POST /auth/login', () => {
    it('should fail if email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer null')
        .send({ email: 'basil3@gmail.com', password: data.password })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('Email does not exist');
          done();
        });
    });

    it('should fail if password is not correct', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer null')
        .send({ email: data.email, password: 'basil123' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('Incorrect password');
          done();
        });
    });

    it('should pass', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer null')
        .send({ email: data.email, password: data.password })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys('token', 'user');
          expect(res.body.data[0].token).to.be.a('string');
          expect(res.body.data[0].user).to.be.an('object');
          expect(res.body.data[0].user).to.include.keys('firstname', 'email', 'phonenumber', 'passporturl', 'password', 'registeras', 'isadmin');
          usertoken = res.body.data[0].token;
          done();
        });
    });


    it('should fail if user is already logged in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ email: data.email, password: data.password })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('You are already logged in');
          done();
        });
    });

  });
  describe('POST/ auth/reset', () => {
    const passwordData = {
      id: 1,
      newPassword: 'change101',
      confirmPassword: 'change101',
    };

    it('should pass if user exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/reset')
        .send(passwordData)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('password', 'message');
          done();
        });
    });

    it('should fail if user does not exists', (done) => {
      const passwordInfo = {
        id: 20,
        newPassword: 'changi1',
        confirmPassword: 'changi1',
      };
      chai.request(app)
        .post('/api/v1/auth/reset')
        .send(passwordInfo)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

  });

  describe('GET /auth/decrypt', () => {
    it('should fail if no authorization', (done) => {
      chai.request(app)
        .get('/api/v1/auth/decrypt')
        .set('Authorization', '')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('You need to Login');
          done();
        });
    });

    it('should pass if token exists', (done) => {
      chai.request(app)
        .get('/api/v1/auth/decrypt')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.keys('id', 'firstname', 'status', 'admin');
          done();
        });
    });
  });


  describe('GET /auth/logout', () => {
    it('should pass if you logout', (done) => {
      chai.request(app)
        .get('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('string');
          expect(res.body.data).to.equal('You are logged out');
          done();
        });

    });
    it('should fail if your are already logged out', (done) => {
      chai.request(app)
        .get('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('You are already logged out');
          done();
        });

    });
    it(' Login should fail if token is expired', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ email: 'basil3@gmail.com', password: data.password })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('Expired Token');
          done();
        });
    });
  });

  describe('POST/ auth/forgot', () => {
    it('should fail if email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgot')
        .send({ email: 'basil3@gmail.com' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('Email does not exist');
          done();
        });
    });
  });

});
