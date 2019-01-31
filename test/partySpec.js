import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiChange from 'chai-change';
import app from '../app/server';
import '@babel/polyfill';

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiChange);

const testParty1 = {
  name: 'partyName',
  AKA: 'pN',
  hqAddress: 'partyAddress',
  logoUrl: 'partyAddress'
};

describe('POST /parties', () => {
  const testParty2 = {
    name: '',
    AKA: 'pN',
    hqAddress: '',
    logoUrl: 'partyAddress'
  };
  const testParty3 = {
    name: 'partyName',
    AKA: 'pN',
    hqAddress: '',
    logoUrl: 'partyAddress'
  };
  it('should fail if party has no name', done => {
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
  it('should fail if party has a name but no address', done => {
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
  it('should pass if party has name and address', done => {
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
describe('Get /parties', () => {
  it('should have status ok', done => {
    chai
      .request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.status(200);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body.status).to.equal(200);
        }
        done();
      });
  });
  it('data should be an array', done => {
    chai
      .request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.keys('id', 'name', 'AKA', 'hqAddress', 'logoUrl');
        }
        done();
      });
  });
  it('should have a message', done => {
    chai
      .request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.property('message');
          expect(res.body)
            .to.have.property('message')
            .which.is.a('string');
        }
        done();
      });
  });
  it('should have fail if there are no parties', done => {
    chai
      .request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        if (res.body.data === null) {
          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
        }
        done();
      });
  });
});
describe('Get /parties/<party-id>', () => {
  it('should have status ok', done => {
    chai
      .request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.status(200);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body.status).to.equal(200);
        }
        done();
      });
  });
  it('data should be an object', done => {
    chai
      .request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'name', 'AKA', 'hqAddress', 'logoUrl');
        }
        done();
      });
  });
  it('should have a message', done => {
    chai
      .request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.property('message');
          expect(res.body)
            .to.have.property('message')
            .which.is.a('string');
        }
        done();
      });
  });
  it('should have fail if there is no party', done => {
    chai
      .request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        if (res.body.data === null) {
          expect(res.body).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
        }
        done();
      });
  });
});

describe('Patch /parties/<party-id>/name', () => {
  const testParty4 = {
    name: 'newPartyName'
  };

  it('should have status created', done => {
    chai
      .request(app)
      .patch('/api/v1/parties/1/name')
      .send(testParty4)
      .end((err, res) => {
        if (res.body.data !== undefined) {
          expect(res.body).to.have.status(201);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body.status).to.equal(201);
        }
        done();
      });
  });
  it('data should be an object', done => {
    chai
      .request(app)
      .patch('/api/v1/parties/1/name')
      .send(testParty4)
      .end((err, res) => {
        if (res.body.data !== undefined) {
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys('id', 'name');
          expect(res.body)
            .to.have.property('message')
            .which.is.a('string');
          expect(res.body)
            .to.have.property('party')
            .which.is.an('object');
          expect(res.body.party).to.have.keys('id', 'name', 'AKA', 'hqAddress', 'logoUrl');
        }
        done();
      });
  });

  it('should have fail if there is no party', done => {
    chai
      .request(app)
      .patch('/api/v1/parties/1/name')
      .end((err, res) => {
        if (res.body.data === undefined) {
          expect(res.body).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
        }
        done();
      });
  });
});
describe('Delete /parties/<party-id>', () => {
  it('should have status ok', done => {
    chai
      .request(app)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        if (res.body.data !== null) {
          expect(res.body).to.have.status(200);
          expect(res.body)
            .to.have.property('status')
            .which.is.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data)
            .to.have.property('message')
            .which.is.a('string');
        }
        done();
      });
  });
  it('should have fail if there is no party', done => {
    chai
      .request(app)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        if (res.body.data === null) {
          expect(res.body).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
        }
        done();
      });
  });
});
