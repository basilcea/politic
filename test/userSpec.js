import chai from 'chai';
import chaiHttp from 'chai-http';
import * as migrate from '../app/models/dbModel';
import app from '../app/server';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

chai.use(chaiHttp);
let token;
const data = {
  firstname: 'basil',
  lastname: 'cea',
  othername: 'chij',
  email: 'ogbonnabasilcea@gmail.com',
  phoneNumber: '09087211595',
  passportUrl: 'http:105/v3',
  password: 'chijind1',
  confirmPassword: 'chijind1',
  registerAs: 'voter',
  isAdmin: false,
};


before(async function () {
  try {
    this.timeout(10000);
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
        token = res.body.data[0].token;
        done();
      });
  });
});

describe('GET /auth/logout', () => {
  it('should pass if you logout', (done) => {
    chai.request(app)
      .get('/api/v1/auth/logout')
      .set('x-access-token', token)
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
      .set('x-access-token', token)
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
});
describe('POST/ auth/forgot', () => {
  it('should fail if email does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot')
      .set('x-access-token', token)
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
  it('should pass if email does exist in database', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot')
      .set('x-access-token', token)
      .send({ email: data.email })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        done();
        // eslint-disable-next-line no-self-assign
        token = token;
      });
  });

});

describe('POST/ auth/reset', () => {
  let passwordData = {
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
    passwordData = {
      id: 5,
      newPassword: 'changi1',
      confirmPassword: 'changi1',
    };
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send(passwordData)
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

describe('POST /auth/login', () => {

  it('should fail if email does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('x-access-token', token)
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
      .set('x-access-token', token)
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
      .set('x-access-token', token)
      .send({ email: data.email, password: 'change101' })
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
        token = res.body.data[0].token;
        done();
      });
  });

  it('should fail if user is already logged in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
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
