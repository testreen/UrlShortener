// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
const app = require('../server.js')
var assert = require('chai').assert;

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Url handling", () => {
  // Test to send an original URL or shortened URL
  describe("GET /:string", () => {
    var app;
    beforeEach(function () {
      app = require('../server', { bustCache: true });
    });

    it("should return a shortened URL when passing long URL with http prefix", (done) => {
      chai.request(app)
        .get('/http://www.someurl.com')
        .end((err,res) => {
          res.should.have.status(200);
          res.text.should.be.a('string');
          done();
        });
    });

    it("should return a shortened URL when passing long URL with https prefix", (done) => {
      chai.request(app)
        .get('/https://www.someurl.com')
        .end((err,res) => {
          res.should.have.status(200);
          res.text.should.be.a('string');
          done();
      });
    });

    it("should return a shortened URL when passing long URL without http(s) prefix", (done) => {
      chai.request(app)
        .get('/www.someurl.com')
        .end((err,res) => {
            res.should.have.status(200);
            res.text.should.be.a('string');
            done();
        });
    });

    it("should redirect to an original URL when passing shortened URL", (done) => {
      const resp = chai.request(app)
        .get('/Ol2Y3ayoEEsp1mppKy7rta9zLpqabg')
        .redirects(0)
        .send();
      done();
    });
  })
})
