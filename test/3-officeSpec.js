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

describe('Test office endpoints', () => {
  const data = {
    email: 'admin01@gmail.com',
    password: 'josh20111',
  };

  const data2 = {
    email: 'basilcea@gmail.com',
    password: 'chijind1',
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
            done()
          });
      } 
  );
  const testOffice = {
    name: 'officename',
    type: 'officetype',
    electDate: '2019-03-30'
  };

  /**
  * test for create party
  * @param {object} testParty2 - test data without  name field
  * @param {object} testParty3 - test data without  hqAddress field
  * @method post
  * @route api/vi/parties
  */
  describe('POST /offices', () => {
    it('should fail if no admin token', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(testOffice)
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
    it('should pass if user is admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testOffice)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.keys('id', 'type', 'name', 'electdate');
          done();
        });
     
    });
    it('should fail if office already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .set('Authorization', `Bearer ${admintoken}`)
        .send(testOffice)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(422);
          expect(res.body).to.have.property('error').which.is.a('string');
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

  describe('Get /offices', () => {
    it('should get offices', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys('id', 'name', 'type', 'electdate');
          done();
        });
    });
    it('should fail if no offices', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (res.body.data === null) {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
          }
          done();
        });
    
    })
  
  });

  /**
  * test for getting a specific party
  * @param request
  * @param resp
  * @param id{integer} - The id value
  * @method get
  * @route api/vi/parties/1
  
  */

  describe('Get /offices/<office-id>', () => {
    it('should pass if office exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices/2')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('status').which.is.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'name', 'type', 'electdate');
          done();
        });
    });
 
    it('should have fail if there is no office', (done) => {
      chai
        .request(app)
        .get('/api/v1/offices/8')
        .set('Authorization', `Bearer ${usertoken}`)
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
  });

  /**
  * test for editing the party name of a specific party
  * @param request
  * @param resp
  * @param id{integer} - The id value
  * @method get
  * @route api/vi/parties/1/name
  
  */
  describe('Patch /offices/<office-id>', () => {
    const testOffice1 = {
      name: 'newOfficeName',
    };

    it('should fail if user is not admin', (done) => {
      chai
        .request(app)
        .patch('/api/v1/offices/3')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(testOffice1)
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
        .patch('/api/v1/offices/8')
        .send(testOffice1)
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          console.log(res.body)
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
    it('should pass if user is admin and office exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/offices/3')
        .send(testOffice1)
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('status').which.is.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'name', 'type', 'electdate');
          expect(res.body.data.name).to.equal('newOfficeName')
          
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

  describe('Delete /offices/<office-id>', () => {
    it('should fail if user is not admin', (done) => {
      chai
        .request(app)
        .delete('/api/v1/offices/3')
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
        .delete('/api/v1/offices/3')
        .set('Authorization', `Bearer ${admintoken}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.equal('office deleted succesfully');
          done();
        });
    });
  
  });
})