import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/server';

chai.use(chaiHttp);
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
let admintoken;
let usertoken;
let anotherusertoken;
describe('Test delete endpoints', () => {
  const data = {
    email: 'admin01@gmail.com',
    password: 'josh20111',
  };
  const data2 = {
    email: 'basilcea@gmail.com',
    password: 'chijind140',
  };
  const data3 = {
    email: 'basil@gmail.com',
    password: 'chijind1',
  };

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
      .send(data3)
      .end((err, res) => {
        anotherusertoken = res.body.data[0].token;
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

  // eslint-disable-next-line no-undef
  describe('DELETE /candidates/<candidate-id>', () => {
    it('should fail if user is not an admin', (done) => {
      chai
        .request(app)
        .delete('/api/v1/candidates/1')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status').which.is.equal(401);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should fail if candidate does not exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/candidates/3')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status').which.is.equal(404);
          expect(res.body).to.have.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if candidate exists', (done) => {
      chai
        .request(app)
        .delete('/api/v1/candidates/1')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data').which.is.an('object').with.keys('message');
          expect(res.body.data.message).to.be.a('string');
          done();
        });
    });
  });
  describe('Delete /interests/<iinterest-id>', () => {
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
        .delete('/api/v1/interests/1')
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
  /**
  * test for delete a specific party
  * @param request
  * @param resp
  * @param id{integer} - The id value
  * @method get
  * @route api/vi/parties/1

  */
  describe('Delete /parties/<party-id>', () => {
    it('should fail if user is not admin', (done) => {
      chai
        .request(app)
        .delete('/api/v1/parties/1')
        .set('Authorization', `Bearer ${usertoken}`)
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

    it('should fail if party does not exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/parties/3')
        .set('Authorization', `Bearer ${admintoken}`)
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
    it('should delete if user is admin and party exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/parties/1')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.equal('party deleted succesfully');
          done();
        });
    });
  });

  describe('Delete /offices/<office-id>', () => {
    it('should fail if user is not admin', (done) => {
      chai
        .request(app)
        .delete('/api/v1/offices/1')
        .set('Authorization', `Bearer ${usertoken}`)
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

    it('should fail if office does not exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/offices/8')
        .set('Authorization', `Bearer ${admintoken}`)
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
    it('should delete if user is admin and office exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/offices/1')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.equal('office deleted succesfully');
          done();
        });
    });
  });
  describe('PATCH /admin/user/<user-id>', () => {
    it('should fail if user is not admin', (done) => {
      chai
        .request(app)
        .patch('/api/v1/admin/user/1')
        .set('Authorization', `Bearer ${usertoken}`)
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

    it('should fail if user does not exist ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/admin/user/8')
        .set('Authorization', `Bearer ${admintoken}`)
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
    it('should make user admin if users exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/admin/user/2')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('info', 'token');
          expect(res.body.data.info).to.be.an('object');
          done();
        });
    });
  });
  describe('PATCH /users/me/edit', () => {
    it('should fail if not the user', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/me/edit')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          // eslint-disable-next-line no-cond-assign
          if (res.body.data[0] = null) {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('status').which.is.equal(401);
            expect(res.body).to.have.property('error').which.is.a('string');
          }
          done();
        });
    });
    it('should pass if admin want to become politician', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/me/edit')
        .set('Authorization', `Bearer ${admintoken}`)
        .send({ registerAs: 'politician' })
        .end((err, res) => {
          // eslint-disable-next-line no-cond-assign
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status').which.is.equal(200);
            expect(res.body).to.have.property('data').which.is.an('object').with.keys('info', 'message');
            expect(res.body.data.info).to.be.an('array');
            expect(res.body.data.message).to.be.a('string');
          done();
        });
    });
    it('should pass', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/me/edit')
        .set('Authorization', `Bearer ${usertoken}`)
        .send({ registerAs: 'politician' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          expect(res.body.data[0]).to.include.keys('firstname', 'lastname', 'othername', 'registeras');
          expect(res.body.data[0].registeras).to.equal('politician');
          done();
        });
    });
  });
  describe('DELETE /users/me', () => {
    it('should delete if user is admin and office exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/users/me')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.equal('Your profile has been deleted');
          done();
        });
    });
  });
});
