import httpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Addresses', () => {
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
  const defaultAddress = {
    id: 1,
    street: 'asd',
    number: 123,
    neightborhood: 'dsa',
    city: 'sda',
    reference: 'sss',
    tell: '123456',
  };

  beforeEach((done) => {
    Users
      .destroy({ where: {}, force: true })
      .then(() => Users.create(authtUser))
      .then((user) => {
        Addresses.destroy({ where: {}, force: true })
          .then(() => Addresses.create(defaultAddress))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /addresses', () => {
    it('should return a list of Addresses', (done) => {
      request
        .get('/addresses')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].city).to.be.eql(defaultAddress.city);
          expect(res.body[0].neightborhood).to.be.eql(defaultAddress.neightborhood);
          expect(res.body[0].street).to.be.eql(defaultAddress.street);
          expect(res.body[0].number).to.be.eql(defaultAddress.number);
          expect(res.body[0].reference).to.be.eql(defaultAddress.reference);
          expect(res.body[0].tell).to.be.eql(defaultAddress.tell);
          done(err);
        });
    });
  });

  describe('Route GET /addresses/{id}', () => {
    it('should return a address', (done) => {
      request
        .get('/addresses/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.city).to.be.eql(defaultAddress.city);
          expect(res.body.neightborhood).to.be.eql(defaultAddress.neightborhood);
          expect(res.body.street).to.be.eql(defaultAddress.street);
          expect(res.body.number).to.be.eql(defaultAddress.number);
          expect(res.body.reference).to.be.eql(defaultAddress.reference);
          expect(res.body.tell).to.be.eql(defaultAddress.tell);

          done(err);
        });
    });
  });

  describe('Route POST /addresses', () => {
    it('should create a address', (done) => {
      const newAddress = {
        id: 2,
        street: 'poiuyt',
        number: 123,
        neightborhood: 'tyuio',
        city: 'yuit',
        reference: 'uuu',
        tell: '765890432',
      };
      request
        .post('/addresses')
        .set('Authorization', `JWT ${token}`)
        .send(newAddress)
        .end((err, res) => {
          expect(res.body.city).to.be.eql(newAddress.city);
          expect(res.body.neightborhood).to.be.eql(newAddress.neightborhood);
          expect(res.body.street).to.be.eql(newAddress.street);
          expect(res.body.number).to.be.eql(newAddress.number);
          expect(res.body.reference).to.be.eql(newAddress.reference);
          expect(res.body.tell).to.be.eql(newAddress.tell);

          done(err);
        });
    });
  });

  describe('Route PUT /addresses/{id}', () => {
    it('should update a address', (done) => {
      const updatedAddress = {
        id: 2,
        street: 'qer',
        number: 32156874,
        neightborhood: 'qwer',
        city: 'qwer',
        reference: 'qwer',
        tell: '1235689777',
      };
      request
        .put('/addresses/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedAddress)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /addresses/{id}', () => {
    it('should delete a address', (done) => {
      request
        .delete('/addresses/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(httpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
