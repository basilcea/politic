/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as migrate from '../app/models/dbModel';
import app from '../app/server';

/** Use chai expect f./1-userSpecttp for handling request */

const expect = chai.expect;

chai.use(chaiHttp);
/**
*@param {object} testParty1

*/
let admintoken;
let usertoken;
let anotherusertoken;
describe('Test petition endpoints', () => {
  const data = {
    email: 'admin01@gmail.com',
    password: 'josh20111',
  };

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
      });
    chai.request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'Bearer null')
      .send(data)
      .end((err, res) => {
        admintoken = res.body.data[0].token;
        done();
      });
  });


  const testPetition1 = {
    office: 1,
    subject: 'bad election',
    body: 'Election not ok',
    evidence: ['http:3000/abg', 'http:3000/v1/ted'],
  };

  /**
  * test for create petition
  * @param {object} testPetition1 - test data without  name field
  * @param {object} testParty3 - test data without  hqAddress field
  * @method post
  * @route api/vi/parties
  */
  describe('POST /petitions', () => {
    it('should fail if user is not a politician', (done) => {
      chai
        .request(app)
        .post('/api/v1/petitions')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testPetition1)
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
    it('should pass if user is a politician', (done) => {
      chai
        .request(app)
        .post('/api/v1/petitions')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .send(testPetition1)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data').which.is.an('object');
          expect(res.body.data).to.have.keys('id', 'office', 'text', 'evidence', 'createdBy');
          expect(res.body.data.evidence).to.be.an('array');
          done();
        });
    });
  });

  /**
  * test for getting all parties
  * @param request
  * @param resp
  * @method get
  * @route api/vi/parties

  */

  describe('Get /petitions', () => {
    it('should get all petitions in database if user is an admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys('id', 'office', 'subject', 'body', 'createdby', 'evidence', 'createdon');
          done();
        });
    });
    it('should fail if no petition for user exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
    it('should get all petition for a particular user ', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data').which.is.an('array');
          expect(res.body.data[0]).to.have.keys('id', 'office', 'subject', 'body', 'createdby', 'evidence', 'createdon');
          done();
        });
    });
  });

  /**
  * test for getting a specific party
  * @param request
  * @param resp
  * @param id{integer} - The id value
  * @method get
  * @route api/vi/parties/1

  */

  describe('Get /petitions/<petition-id>', () => {
    it('should have fail if petition does not exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions/8')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res.body).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
          done();
        });
    });
    it('should pass if petition exists and user is an admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions/1')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').which.is.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'office', 'subject', 'body', 'createdby', 'evidence', 'createdon');
          done();
        });
    });
    it('should fail if petition exists and user not the creator nor admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions/1')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status').which.is.a('number').equal(401);
          expect(res.body).to.property('error').which.is.a('string');
          done();
        });
    });
    it('should pass if petition exists and user is the creator', (done) => {
      chai
        .request(app)
        .get('/api/v1/petitions/1')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').which.is.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'office', 'subject', 'body', 'createdby', 'evidence', 'createdon');
          done();
        });
    });
  });

  /**
  * test for editing the party name of a specific party
  * @param request
  * @param resp
  * @param id{integer} - The id value
  * @method get
  * @route api/vi/parties/1/name

  */
  describe('Patch /petitions/<petition-id>', () => {
    const testPetition2 = {
      body: 'poor election',
    };
    it('should fail if petition does not exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/petition/5')
        .send(testPetition2)
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
    it('should fail if user not creator', (done) => {
      chai
        .request(app)
        .patch('/api/v1/petitions/1')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testPetition2)
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

    it('should patch if petition exist and user is the creator', (done) => {
      chai
        .request(app)
        .patch('/api/v1/petitions/1')
        .send(testPetition2)
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').which.is.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'office', 'createdBy', 'text', 'evidence');
          done();
        });
    });
  });
  describe('Delete /petitions/<petition-id>', () => {
    it('should fail if user is not creator', (done) => {
      chai
        .request(app)
        .delete('/api/v1/petitions/1')
        .set('Authorization', `Bearer ${admintoken}`)
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

    it('should fail if petition does not exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/petitions/3')
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
    it('should delete if user is creator and petition exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/petitions/1')
        .set('Authorization', `Bearer ${anotherusertoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.equal('petition deleted succesfully');
          done();
        });
    });
  });
});
