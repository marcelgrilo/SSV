import httpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  let token;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    login: 'mei@iem.com',
    password: 'test',
  };

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then((user) => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of Users', (done) => {
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].login).to.be.eql(defaultUser.login);

          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
        .get('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.login).to.be.eql(defaultUser.login);

          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'new Default User',
        login: 'newmei@iem.com',
        password: 'test',
      };
      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.login).to.be.eql(newUser.login);

          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updatedDefault User',
        login: 'updatedmei@iem.com',
      };
      request
        .put('/users/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(httpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
