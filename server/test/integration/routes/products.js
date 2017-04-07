import httpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Products', () => {
  const jwtSecret = app.config.jwtSecret;
  const Users = app.datasource.models.Users;
  const authtUser = {
    id: 1,
    name: 'tester',
    login: 'tester@t.com',
    password: '123456',
  };
  let token;

  const Products = app.datasource.models.Products;
  const defaultProduct = {
    id: 1,
    name: 'Default product',
    price: 1.0,
  };

  beforeEach((done) => {
    Users
      .destroy({ where: {}, force: true })
      .then(() => Users.create(authtUser))
      .then((user) => {
        Products
        .destroy({ where: {}, force: true })
        .then(() => Products.create(defaultProduct))
        .then(() => {
          token = jwt.encode({ id: user.id }, jwtSecret);
          done();
        });
      });
  });

  describe('Route GET /products', () => {
    it('should return a list of Products', (done) => {
      request
        .get('/products')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultProduct.id);
          expect(res.body[0].name).to.be.eql(defaultProduct.name);
          expect(res.body[0].price).to.be.eql(defaultProduct.price);
          expect(res.body[0].isDeleted).to.be.eql(defaultProduct.isDeleted);

          done(err);
        });
    });
  });

  describe('Route GET /products/{id}', () => {
    it('should return a product', (done) => {
      request
        .get('/products/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultProduct.id);
          expect(res.body.name).to.be.eql(defaultProduct.name);
          expect(res.body.price).to.be.eql(defaultProduct.price);
          expect(res.body.isDeleted).to.be.eql(defaultProduct.isDeleted);

          done(err);
        });
    });
  });

  describe('Route POST /products', () => {
    it('should create a product', (done) => {
      const newProduct = {
        id: 2,
        name: 'new Product',
        price: 2.50,
      };
      request
        .post('/products')
        .set('Authorization', `JWT ${token}`)
        .send(newProduct)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newProduct.id);
          expect(res.body.name).to.be.eql(newProduct.name);
          expect(res.body.price).to.be.eql(newProduct.price);
          expect(res.body.isDeleted).to.be.eql(newProduct.isDeleted);

          done(err);
        });
    });
  });

  describe('Route PUT /products/{id}', () => {
    it('should update a product', (done) => {
      const updatedProduct = {
        id: 1,
        name: 'updatedDefault Product',
        price: 3.69,
      };
      request
        .put('/products/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedProduct)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /products/{id}', () => {
    it('should delete a product', (done) => {
      request
        .delete('/products/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(httpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
