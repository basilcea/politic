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
  firstname: 'admin',
  lastname: 'apc',
  othername: '',
  email: 'admin01@gmail.com',
  phoneNumber: '00000000001',
  passportUrl: 'http:105/v3',
  password: 'josh20111',
  confirmPassword: 'josh20111',
  registerAs: 'voter',
  isAdmin: true,
};

const data2 = {
  firstname: 'basil',
  lastname: 'cea',
  othername: 'chij',
  email: 'basilcea@gmail.com',
  phoneNumber: '09087211594',
  passportUrl: 'http:105/v4',
  password: 'chijind1',
  confirmPassword: 'chijind1',
  registerAs: 'voter',
};

let admintoken;
let usertoken;
before(
  async () => {
    try {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', 'Bearer null')
        .send(data)
        .end((err, res) => {
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
        .post('/api/v1/auth/signup')
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
const testParty1 = {
  name: 'partyname',
  hqAddress: 'partyAddress',
  logoUrl: 'http:/partyAddress',
};

/**
* test for create party
* @param {object} testParty2 - test data without  name field
* @param {object} testParty3 - test data without  hqAddress field
* @method post
* @route api/vi/parties
*/
describe('POST /parties', () => {
  it('should fail if no admin token', (done) => {
    chai
      .request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${usertoken}`)
      .send({
        name: 'partyname',
        hqAddress: 'partyAddress',
        logoUrl: 'http:/partyAddress',
      })
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
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${admintoken}`)
      .send(testParty1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.keys('id', 'name', 'hqaddress', 'logourl');
      });
    
  });
  it('should fail if party already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${admintoken}`)
      .send(testParty1)
      .end((err, res) => {
        console.log(res.status)
        expect(res.status).to.equal(422);
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

describe('Get /parties', () => {
  it('should get parties', (done) => {
    chai
      .request(app)
      .get('/api/v1/parties')
      .set('Authorization', `Bearer ${usertoken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.keys('id', 'name', 'hqaddress', 'logourl');
        done();
      });
  });
  it('should fail if no parties', (done) => {
    chai
      .request(app)
      .get('/api/v1/parties')
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

describe('Get /parties/<party-id>', () => {
  it('should pass if party exist', (done) => {
    chai
      .request(app)
      .get('/api/v1/parties/1')
      .set('Authorization', `Bearer ${usertoken}`)
      .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('status').which.is.a('number');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys('id', 'name', 'hqaddress', 'logourl');
        done();
      });
  });
 
  it('should have fail if there is no party', (done) => {
    chai
      .request(app)
      .get('/api/v1/parties/8')
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
describe('Patch /parties/<party-id>', () => {
  const testParty4 = {
    name: 'newPartyName',
  };

  it('should fail if user is not admin', (done) => {
    chai
      .request(app)
      .patch('/api/v1/parties/3')
      .set('Authorization', `Bearer ${usertoken}`)
      .send(testParty4)
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
      .patch('/api/v1/parties/5')
      .send(testParty4)
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
  it('should patch if user is admin and party exist', (done) => {
    chai
      .request(app)
      .patch('/api/v1/parties/3')
      .send(testParty4)
      .set('Authorization', `Bearer ${admintoken}`)
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('status').which.is.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'name' ,'hqaddress','logourl');
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
      .delete('/api/v1/parties/3')
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
      .delete('/api/v1/parties/5')
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
  it('should delete if user is admin and party exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/parties/3')
      .set('Authorization', `Bearer ${admintoken}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status').which.is.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys('message');
        expect(res.body.data.message).to.equal('party deleted succesfully');
        done();
      });
  });
  
});
