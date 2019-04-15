// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
const app = require("../server.js");
var assert = require("chai").assert;

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Url handling", () => {
  // Test the session only original URL or shortened URL
  describe("GET /:string", () => {
    var app;
    var url;
    beforeEach(function(done) {
      app = require("../server", { bustCache: true });
      chai
        .request(app)
        .get("/www.someurl.com")
        .end((err, res) => {
          url = res.text; // Record the response for the tests.
          done(); // Tell mocha that the ``before`` callback is done.
        });
    });

    it("should return the same result with http://, https:// and without http(s)://", done => {
      var url;
      chai
        .request(app)
        .get("/www.someurl.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a("string");
          url = res.text.substr(res.text.lastIndexOf("/") + 1);
        });
      chai
        .request(app)
        .get("/http://www.someurl.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a("string");
          res.text.substr(res.text.lastIndexOf("/") + 1).should.be.equal(url);
        });
      chai
        .request(app)
        .get("/https://www.someurl.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a("string");
          res.text.substr(res.text.lastIndexOf("/") + 1).should.be.equal(url);
        });
      done();
    });

    it("should redirect to an original URL when passing shortened URL", done => {
      chai
        .request(app)
        .get(url)
        .redirects(0)
        .send();
      done();
    });

    it("should return a 404 status when passing incorrect original URL", done => {
      chai
        .request(app)
        .get("/www.someurl")
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.a("string");
          done();
        });
    });

    it("should return a 404 status when passing incorrect shortened URL", done => {
      chai
        .request(app)
        .get("/-abcdefg")
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.a("string");
          done();
        });
    });
  });

  // Test the permanent original URL and shortened URL
  describe("GET /permanent/:string", () => {
    var app;
    var url;
    beforeEach(function(done) {
      app = require("../server", { bustCache: true });
      chai
        .request(app)
        .get("/permanent/www.someurl.com")
        .end((err, res) => {
          url = res.text;
          done();
        });
    });

    it("should return the same result with http://, https:// and without http(s)://", done => {
      var url;
      chai
        .request(app)
        .get("/permanent/www.someurl.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a("string");
          url = res.text.substr(res.text.lastIndexOf("/") + 1);
        });
      chai
        .request(app)
        .get("/permanent/http://www.someurl.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a("string");
          res.text.substr(res.text.lastIndexOf("/") + 1).should.be.equal(url);
        });
      chai
        .request(app)
        .get("/permanent/https://www.someurl.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a("string");
          res.text.substr(res.text.lastIndexOf("/") + 1).should.be.equal(url);
        });
      done();
    });

    it("should redirect to an original URL when passing shortened URL", done => {
      chai
        .request(app)
        .get(url)
        .redirects(0)
        .send();
      done();
    });

    it("should return a 404 status when passing incorrect original URL", done => {
      chai
        .request(app)
        .get("/permanent/www.someurl")
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.a("string");
          done();
        });
    });

    it("should return a 404 status when passing incorrect shortened URL", done => {
      chai
        .request(app)
        .get("/abcdefg")
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.a("string");
          done();
        });
    });
  });
});
