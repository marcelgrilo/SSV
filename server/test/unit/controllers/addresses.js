import httpStatus from 'http-status';
import AddressController from '../../../controllers/addresses';

describe('controllers Addresses', () => {
  describe('Get all Addresses: getAll', () => {
    it('should return a list of Addresses', () => {
      const Address = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        street: 'asd',
        number: 123,
        neightborhood: 'dsa',
        city: 'sda',
        reference: 'sss',
        tell: '123456',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        client_id: null,
      }];

      td.when(Address.findAll({})).thenResolve(expectedResponse);

      const controller = new AddressController(Address);
      return controller.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a Address: getById', () => {
    it('should return a Address', () => {
      const Address = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        street: 'asd',
        number: 123,
        neightborhood: 'dsa',
        city: 'sda',
        reference: 'sss',
        tell: '123456',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        client_id: null,
      }];


      td.when(
        Address.findOne({ where: { id: 1 } }))
        .thenResolve(expectedResponse);

      const controller = new AddressController(Address);
      return controller.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a Client with address: create', () => {
    it('should create a address with address', () => {
      const Address = {
        create: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        street: 'asd',
        number: 123,
        neightborhood: 'dsa',
        city: 'sda',
        reference: 'sss',
        tell: '123456',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        client_id: null,
      }];


      const requestBody = {
        street: 'asd',
        number: 123,
        neightborhood: 'dsa',
        city: 'sda',
        reference: 'sss',
        tell: '123456',
      };

      td.when(Address.create(requestBody)).thenResolve(expectedResponse);

      const clientController = new AddressController(Address);
      return clientController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(httpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a address: update', () => {
    it('should update an existig address', () => {
      const Address = {
        update: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        street: 'asd',
        number: 123,
        neightborhood: 'dsa',
        city: 'sda',
        reference: 'sss',
        tell: '123456',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        client_id: null,
      }];

      const requestBody = {
        street: 'aaa',
        number: 111,
        neightborhood: 'sss',
        city: 'ddd',
      };

      td.when(Address.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const clientController = new AddressController(Address);
      return clientController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a product: delete', () => {
    it('should delete an existing User', () => {
      const Address = {
        destroy: td.function(),
      };

      td.when(Address.destroy({ where: { id: 1 } })).thenResolve({});

      const clientController = new AddressController(Address);
      return clientController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(httpStatus.NO_CONTENT));
    });
  });
});
