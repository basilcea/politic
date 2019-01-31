import chai from 'chai';

const expect = chai.expect;
const should = chai.should();

/* ------------Test that mocha chai is working-------------*/
describe('Chai is working', () => {
  const ok = true;
  it('should return ok', () => {
    expect(ok).to.be.true;
  });
  it('should return ok', () => {
    ok.should.be.true;
  });
});
