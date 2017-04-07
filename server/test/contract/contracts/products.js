import httpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Users', () => {
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
    it('should return a list of products', (done) => {
      const productsList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        price: Joi.number(),
        user_id: Joi.number().allow(null),
        deleted_at: Joi.date().allow(null),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));
      request
        .get('/products')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, productsList);
          done(err);
        });
    });
  });

  describe('Route GET /products/{id}', () => {
    it('should return a product', (done) => {
      const product = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        price: Joi.number(),
        user_id: Joi.number().allow(null),
        deleted_at: Joi.date().allow(null),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      request
        .get('/products/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, product);
          done(err);
        });
    });
  });

  describe('Route POST /products', () => {
    it('should create a product', (done) => {
      const product = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        price: Joi.number(),
        user_id: Joi.number().allow(null),
        deleted_at: Joi.date().allow(null),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      const newProduct = {
        id: 2,
        name: 'new Default User',
        price: 3.55,
      };
      request
        .post('/products')
        .send(newProduct)
        .end((err, res) => {
          joiAssert(res.body, product);
          done(err);
        });
    });
  });

  describe('Route PUT /products/{id}', () => {
    it('should update a product', (done) => {
      const updatedProduct = {
        id: 1,
        name: 'updatedDefault product',
        price: 2.68,
      };
      const updatedCount = Joi.array().items(1);
      request
        .put('/products/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedProduct)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
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
