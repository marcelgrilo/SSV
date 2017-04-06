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
    isDeleted: false,
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
      const usersList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        login: Joi.string(),
        password: Joi.string(),
        isDeleted: Joi.boolean(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, usersList);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        login: Joi.string(),
        password: Joi.string(),
        isDeleted: Joi.boolean(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      request
        .get('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, user);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        login: Joi.string(),
        password: Joi.string(),
        isDeleted: Joi.boolean(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      const newUser = {
        name: 'new Default User',
        login: 'newmei@iem.com',
        password: 'test',
      };
      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          joiAssert(res.body, user);
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
        password: 'newpsw',
        isDeleted: false,
      };
      const updatedCount = Joi.array().items(1);
      request
        .put('/users/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
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
