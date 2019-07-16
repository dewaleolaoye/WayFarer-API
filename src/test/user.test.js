/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../index';

const correctUser = {
  first_name: 'Adewale',
  last_name: 'Olaoye',
  email: faker.internet.email(),
  password: 'password',
};

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

const signupUrl = '/api/v1/auth/signup';
// const signinUrl = '/api/v1/auth/signin';

describe(`POST ${signupUrl}`, () => {
  it('should sign up user successfully', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .json(correctUser)
      .end((err, res) => {
        console.log(res.status);
        console.log(res.body);
        const { body } = res;
        expect(res.status).to.equal(201);
        expect(body).to.be.an('object');
        expect(res.status).to.be.a('number');
        expect(body.data).to.be.an('object');
        expect(body.data).to.be.have.property('token');
        expect(body.data).to.be.have.property('first_name');
        expect(body.data).to.be.have.property('last_name');
        expect(body.data).to.be.have.property('is_admin');
        expect(body.data).to.be.have.property('email');
        done();
      });
  });
});

// describe(`POST ${signinUrl}`, () => {
//   it('should sign in user successfully', (done) => {
//     chai
//       .request(app)
//       .post(signinUrl)
//       .json(correctUser)
//       .end((err, res) => {
//         const { body } = res;
//         expect(res.status).to.be.equal(201);
//         expect(res.status).to.be.a('number');
//         expect(body.data).to.be.have.property('email');
//         expect(body.data).to.be.have.property('token');
//         done();
//       });
//   });
// });
