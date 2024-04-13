const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const userModel = require('../models/userModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  let token = ''; 

  before((done) => {
    const credentials = {
      username: 'testuser',
      password: 'testpassword'
    };

    chai.request(app)
      .post('/login')
      .send(credentials)
      .end((err, res) => {
        token = res.body.token; 
        done();
      });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const newUser = {
        username: 'testuser',
        password: 'testpassword'
      };

      chai.request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`) 
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.equal('User created successfully');
          expect(res.body.user).to.have.property('id');
          expect(res.body.user).to.have.property('username').to.equal(newUser.username);
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by ID', (done) => {
      const userId = 1; 

      chai.request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`) 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('id').to.equal(userId);
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should authenticate user and generate JWT token', (done) => {
      const credentials = {
        username: 'testuser',
        password: 'testpassword'
      };

      chai.request(app)
        .post('/login')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
});
