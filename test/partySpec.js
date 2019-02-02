import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/server';
import '@babel/polyfill';

/** Use chai expect for tdd and http for handling request */

const expect = chai.expect;

chai.use(chaiHttp);

/**
*@param {object} testParty1

*/

const testParty1 = {
  name: 'partyName',
  AKA: 'pN',
  hqAddress: 'partyAddress',
  logoUrl: 'partyAddress'
};

/**
* test for create party
* @param {object} testParty2 - test data without  name field
* @param {object} testParty3 - test data without  hqAddress field
* @method post
* @route api/vi/parties

*/
describe('POST /parties', () => {
  const testParty2 = {
    name: '',
    AKA: 'pN',
    hqAddress: '',
    logoUrl: 'urlAddress'
  };
  const testParty3 = {
    name: 'partyName',
    AKA: 'pN',
    hqAddress: '',
    logoUrl: 'urlAddress'
  };
  const testParty4 = {
    name: '1',
    AKA: 'pN',
    hqAddress: 'partyaddress',
    logoUrl: 'urlAddress'
  };
  it('should fail if party has no name', (done) => {
    chai
      .request(app)
      .post('/api/v1/parties')
      .send(testParty2)
      .end((err, res) => {
        expect(res).to.have.status(412);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(412);
        expect(res.body)
          .to.have.property('error')
          .which.is.a('string');
        done();
      });
  });

  it('should fail if party name is not an alphabet', (done) => {
    chai
      .request(app)
      .post('/api/v1/parties')
      .send(testParty4)
      .end((err, res) => {
        expect(/^[a-zA-Z]+$/.test(testParty4.name)).to.be.false
        expect(res).to.have.status(406);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(406);
        expect(res.body)
          .to.have.property('error')
          .which.is.a('string');
        done();
      });
  });
  it('should fail if party has a name but no address', (done) => {
    chai
      .request(app)
      .post('/api/v1/parties')
      .send(testParty3)
      .end((err, res) => {
        expect(res).to.have.status(412);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(412);
        expect(res.body)
          .to.have.property('error')
          .which.is.a('string');
        done();
      });
  });
  it('should pass if party has name and address', (done) => {
    chai
      .request(app)
      .post('/api/v1/parties')
      .send(testParty1)
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data)
          .to.have.property('id')
          .which.is.a('number');
        expect(res.body.data)
          .to.have.property('name')
          .which.is.a('string');
        expect(res.body.data)
          .to.have.property('hqAddress')
          .which.is.a('string');
        expect(res.body)
          .to.have.property('message')
          .which.is.a('string');
        done();
      });
  });
});



