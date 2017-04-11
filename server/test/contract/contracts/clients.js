import httpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Clients', () => {
  const jwtSecret = app.config.jwtSecret;
  const Users = app.datasource.models.Users;
  const authtUser = {
    id: 1,
    name: 'tester',
    login: 'tester@t.com',
    password: '123456',
  };
  let token;
  const Addresses = app.datasource.models.Addresses;
  const Clients = app.datasource.models.Clients;
  const defaultClient = {
    id: 1,
    name: 'Default client',
    tell: '123456789',
    cell: '123456789',
    Addresses: [{
      street: 'asd',
      number: 123,
      neightborhood: 'dsa',
      city: 'sda',
      reference: 'sss',
      tell: '123456',
    },
    {
      street: 'qwe',
      number: 654,
      neightborhood: 'ewq',
      city: 'weq',
      reference: 'www',
      tell: '654321',
    }],
  };

  beforeEach((done) => {
    Users
      .destroy({ where: {}, force: true })
      .then(() => Users.create(authtUser))
      .then((user) => {
        Clients
        .destroy({ where: {}, force: true })
        .then(() => Addresses.destroy({ where: {}, force: true }))
        .then(() => Clients.create(defaultClient, { include: [Addresses] }))
        .then(() => {
          token = jwt.encode({ id: user.id }, jwtSecret);
          done();
        });
      });
  });

  describe('Route GET /clients', () => {
    it('should return a list of Clients', (done) => {
      const clientsList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        tell: Joi.string().allow(null),
        cell: Joi.string().allow(null),
        Addresses: Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          street: Joi.string(),
          number: Joi.number(),
          neightborhood: Joi.string(),
          city: Joi.string(),
          reference: Joi.string().allow(null),
          tell: Joi.string().allow(null),
          deleted_at: Joi.date().allow(null),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
          client_id: Joi.number().allow(null),
        })),
        user_id: Joi.number().allow(null),
        deleted_at: Joi.date().allow(null),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
        .get('/clients')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, clientsList);
          done(err);
        });
    });
  });

  describe('Route GET /clients/{id}', () => {
    it('should return a client', (done) => {
      const client = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        tell: Joi.string().allow(null),
        cell: Joi.string().allow(null),
        Addresses: Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          street: Joi.string(),
          number: Joi.number(),
          neightborhood: Joi.string(),
          city: Joi.string(),
          reference: Joi.string().allow(null),
          tell: Joi.string().allow(null),
          deleted_at: Joi.date().allow(null),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
          client_id: Joi.number().allow(null),
        })),
        user_id: Joi.number().allow(null),
        deleted_at: Joi.date().allow(null),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .get('/clients/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, client);
          done(err);
        });
    });
  });

  describe('Route POST /clients', () => {
    it('should create a client', (done) => {
      const client = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        tell: Joi.string().allow(null),
        cell: Joi.string().allow(null),
        Addresses: Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          street: Joi.string(),
          number: Joi.number(),
          neightborhood: Joi.string(),
          city: Joi.string(),
          reference: Joi.string().allow(null),
          tell: Joi.string().allow(null),
          deleted_at: Joi.date().allow(null),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
          client_id: Joi.number().allow(null),
        })),
        user_id: Joi.number().allow(null),
        deleted_at: Joi.date().allow(null),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      const newClient = {
        id: 2,
        name: 'new client',
        tell: '987654321',
        cell: '987654321',
        Addresses: [{
          street: 'poiuyt',
          number: 123,
          neightborhood: 'tyuio',
          city: 'yuit',
          reference: 'uuu',
          tell: '765890432',
        }],
      };

      request
        .post('/clients')
        .send(newClient)
        .end((err, res) => {
          joiAssert(res.body, client);
          done(err);
        });
    });
  });

  describe('Route PUT /clients/{id}', () => {
    it('should update a client', (done) => {
      const updatedClient = {
        id: 1,
        name: 'updatedDefault Client',
        tell: '123456',
        cell: '123564987',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/clients/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedClient)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /clients/{id}', () => {
    it('should delete a client', (done) => {
      request
        .delete('/clients/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(httpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
