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
      request
        .get('/clients')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultClient.id);
          expect(res.body[0].name).to.be.eql(defaultClient.name);
          expect(res.body[0].tell).to.be.eql(defaultClient.tell);
          expect(res.body[0].cell).to.be.eql(defaultClient.cell);
          expect(res.body[0].Addresses.city).to.be.eql(defaultClient.Addresses.city);
          expect(res.body[0].Addresses.neightborhood).to.be.eql(
            defaultClient.Addresses.neightborhood);
          expect(res.body[0].Addresses.street).to.be.eql(defaultClient.Addresses.street);
          expect(res.body[0].Addresses.number).to.be.eql(defaultClient.Addresses.number);
          expect(res.body[0].Addresses.reference).to.be.eql(defaultClient.Addresses.reference);
          expect(res.body[0].Addresses.tell).to.be.eql(defaultClient.Addresses.tell);
          done(err);
        });
    });
  });

  describe('Route GET /clients/{id}', () => {
    it('should return a client', (done) => {
      request
        .get('/clients/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultClient.id);
          expect(res.body.name).to.be.eql(defaultClient.name);
          expect(res.body.tell).to.be.eql(defaultClient.tell);
          expect(res.body.cell).to.be.eql(defaultClient.cell);
          expect(res.body.Addresses.city).to.be.eql(defaultClient.Addresses.city);
          expect(res.body.Addresses.neightborhood).to.be.eql(
            defaultClient.Addresses.neightborhood);
          expect(res.body.Addresses.street).to.be.eql(defaultClient.Addresses.street);
          expect(res.body.Addresses.number).to.be.eql(defaultClient.Addresses.number);
          expect(res.body.Addresses.reference).to.be.eql(defaultClient.Addresses.reference);
          expect(res.body.Addresses.tell).to.be.eql(defaultClient.Addresses.tell);

          done(err);
        });
    });
  });

  describe('Route POST /clients', () => {
    it('should create a client', (done) => {
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
        .set('Authorization', `JWT ${token}`)
        .send(newClient)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newClient.id);
          expect(res.body.name).to.be.eql(newClient.name);
          expect(res.body.price).to.be.eql(newClient.price);
          expect(res.body.isDeleted).to.be.eql(newClient.isDeleted);
          expect(res.body.Addresses.city).to.be.eql(newClient.Addresses.city);
          expect(res.body.Addresses.neightborhood).to.be.eql(newClient.Addresses.neightborhood);
          expect(res.body.Addresses.street).to.be.eql(newClient.Addresses.street);
          expect(res.body.Addresses.number).to.be.eql(newClient.Addresses.number);
          expect(res.body.Addresses.reference).to.be.eql(newClient.Addresses.reference);
          expect(res.body.Addresses.tell).to.be.eql(newClient.Addresses.tell);

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
      request
        .put('/clients/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedClient)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
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
