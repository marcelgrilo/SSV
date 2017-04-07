import httpStatus from 'http-status';
import ProductController from '../../../controllers/products';

describe('controllers Products', () => {
  describe('Get all Products: getAll', () => {
    it('should return a list of Products', () => {
      const Product = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        price: 1.25,
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Product.findAll({})).thenResolve(expectedResponse);

      const productController = new ProductController(Product);
      return productController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get all Product: getById', () => {
    it('should return a User', () => {
      const Product = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        price: 1.25,
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Product.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const productController = new ProductController(Product);
      return productController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a product: create', () => {
    it('should create a product', () => {
      const Product = {
        create: td.function(),
      };

      const requestBody = {
        name: 'newtest',
        price: 1.55,
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        price: 1.25,
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Product.create(requestBody)).thenResolve(expectedResponse);

      const productController = new ProductController(Product);
      return productController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a product: update', () => {
    it('should update an existig User', () => {
      const Product = {
        update: td.function(),
      };

      const requestBody = {
        name: 'newtest',
        price: 1.55,
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        price: 1.25,
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Product.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const productController = new ProductController(Product);
      return productController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a product: delete', () => {
    it('should delete an existing User', () => {
      const Product = {
        destroy: td.function(),
      };

      td.when(Product.destroy({ where: { id: 1 } })).thenResolve({});

      const productController = new ProductController(Product);
      return productController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(httpStatus.NO_CONTENT));
    });
  });
});
