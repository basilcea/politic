import chai from 'chai';
import app from '../app/server';
import chaiHttp from 'chai-http';
import chaiChange from 'chai-change';
import '@babel/polyfill';

const expect = chai.expect;

chai.use(chaiHttp);

const testOffice1 = {
    'type': 'officetype',
  name: 'officeName'

  }

describe('POST /offices', function() {
  const testOffice2 = {
    type: '',
    name: 'officeName'
  };
  const testOffice3 = {
    type: '',
    name: 'officeName'
  };
  it('should fail if office has no type', (done) => {
    chai.request(app)
    .post('/api/v1/offices')
    .send(testOffice2)
    .end(function(err,res){
      expect(res).to.have.status(412)
      expect(res.body).to.have.property('status')
      expect(res.body.status).to.equal(412)
      expect(res.body).to.have.property('error').which.is.a('string')
      done()
    })
  });
  it('should fail if office has no name', (done) => {
    chai.request(app)
    .post('/api/v1/offices')
    .send(testOffice3)
    .end(function(err,res){
      expect(res).to.have.status(412)
      expect(res.body).to.have.property('status')
      expect(res.body.status).to.equal(412)
      expect(res.body).to.have.property('error').which.is.a('string')
      done()
    })
  });
  it('should pass if office has type and name', (done) => {
    chai.request(app)
    .post('/api/v1/offices')
    .send(testOffice1)
    .end(function(err,res){
      expect(res.body).to.have.status(201)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('status')
      expect(res.body.status).to.equal(201)
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.have.property('id').which.is.a('number')
      expect(res.body.data).to.have.property('type').which.is.a('string')
      expect(res.body.data).to.have.property('name').which.is.a('string')
      expect(res.body).to.have.property('message').which.is.a('string')
      done()
    })
  });
});
describe('Get /offices', function() {
  it('should have status ok', (done) => {
    chai.request(app)
    .get('/api/v1/offices')
    .end(function(err,res){
      if((res.body.data)!==null){
        expect(res.body).to.have.status(200)
        expect(res.body).to.have.property('status').which.is.a('number')
        expect(res.body.status).to.equal(200)
      }
      done()
    })
  });
  it('data should be an array', function(done) {
    chai
      .request(app)
    .get('/api/v1/offices')
    .end((err,res) => {
      if((res.body.data)!==null){
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.be.an('array')
        expect(res.body.data[0]).to.have.keys('id','type','name',)

      }
      done()
    });
  });
  it('should have a message', function(done) {
    chai
      .request(app)
    .get('/api/v1/offices')
      .end(function(err, res) {
        if (res.body.data !== null) {
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('message').which.is.a('string')
      }
      done()
    });
  });
  it('should have fail if there are no offices', function(done) {
    chai
      .request(app)
      .get('/api/v1/offices')
    .end((err,res) => {
      if((res.body.data)===null){
        expect(res.body).to.have.status(400)
        expect(res.body).to.have.property('status')
        expect(res.body.status).to.equal(400)
        expect(res.body).to.have.property('error').which.is.a('string')
      }
      done()
    });
  });
});
describe('Get /offices/<office-id>', function() {
  it('should have status ok', (done) => {
    chai.request(app)
    .get('/api/v1/offices/1')
    .end(function(err,res){
      if((res.body.data)!==null){
        expect(res.body).to.have.status(200)
        expect(res.body).to.have.property('status').which.is.a('number')
        expect(res.body.status).to.equal(200)
      }
      done()
    })
  });
  it('data should be an object', function(done) {
    chai
      .request(app)
    .get('/api/v1/offices/1')
      .end(function(err, res) {
      if((res.body.data)!==null){
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.be.an('object')
        expect(res.body.data).to.have.keys('id','type','name')
        }
      done()
    });
  });
  it('should have a message', function(done) {
    chai.request(app)
    .get('/api/v1/offices/1')
    .end((err,res) => {
      if((res.body.data)!==null){
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('message').which.is.a('string')
      }
      done()
    });
  });
  it('should have fail if there is no office', function(done) {
    chai.request(app)
    .get('/api/v1/offices/1')
      .end(function(err, res) {
      if((res.body.data)===null){
          expect(res.body).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .which.is.a('string');
        }
      done()
    });
  });
}
