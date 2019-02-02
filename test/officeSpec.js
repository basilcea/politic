import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/server';
import '@babel/polyfill';

/** Use chai expect for tdd and http for handling request */

const expect = chai.expect;

chai.use(chaiHttp);

/**
*@param {object} testOffice1

*/
const testOffice1 = {
  type: 'officetype',
  name: 'officeName'

};
/**
* test for create office
* @param {object} testoffice2 - test data without type field
* @param {object} testoffice3 - test data without  hqAddress field
* @method post
* @route api/vi/office

*/
describe('POST /offices', () => {
  const testOffice2 = {
    type: '',
    name: 'officeName'
  };
  const testOffice3 = {
    type: 'federal',
    name: ''
  };
  const testOffice4 = {
    type: 1,
    name: ''
  };
  const testOffice5= {
    type: 'federal',
    name: 1
  };
  it('should fail if office has no type', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(testOffice2)
      .end((err, res) => {
        expect(res).to.have.status(412);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(412);
        expect(res.body).to.have.property('error').which.is.a('string');
        done();
      });
  });
  it('should fail if office type is not an alphabet', (done) => {
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(testOffice4)
      .end((err, res) => {
        expect(/^[a-zA-Z]+$/.test(testOffice4.name)).to.be.false
        expect(res).to.have.status(406);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(406);
        expect(res.body)
          .to.have.property('error')
          .which.is.a('string');
        done();
      });
  });

  it('should fail if office has no name', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(testOffice3)
      .end((err, res) => {
        expect(res).to.have.status(412);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(412);
        expect(res.body).to.have.property('error').which.is.a('string');
        done();
      });
  });
  it('should fail if office name is not an alphabet', (done) => {
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(testOffice5)
      .end((err, res) => {
        expect(/^[a-zA-Z]+$/.test(testOffice5.name)).to.be.false
        expect(res).to.have.status(406);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(406);
        expect(res.body)
          .to.have.property('error')
          .which.is.a('string');
        done();
      });
  });

  it('should pass if office has type and name', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(testOffice1)
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id').which.is.a('number');
        expect(res.body.data).to.have.property('type').which.is.a('string');
        expect(res.body.data).to.have.property('name').which.is.a('string');
        expect(res.body).to.have.property('message').which.is.a('string');
        done();
      });
  });
});

