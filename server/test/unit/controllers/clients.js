import httpStatus from 'http-status';
import ClientController from '../../../controllers/clients';

describe('controllers Clients', () => {
  describe('Get all Clients: getAll', () => {
    it('should return a list of Clients', () => {

      const Client = {
        findAll: td.function(),
      };

      const Address = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        Addresses:[{
          street: 'asd',
          number: 123,
          neightborhood: 'dsa',
          city: 'sda',
          reference:'sss',
          tell: '123456',
          deleted_at: null,
          created_at: '2017-03-25T18:42:01.6658',
          updated_at: '2017-03-25T18:42:01.6658',
        }],
      }];

      td.when(Client.findAll({ include: [Address] })).thenResolve(expectedResponse);

      const clientController = new ClientController(Client, Address);
      return clientController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a Client: getById', () => {
    it('should return a Client', () => {

      const Client = {
        findOne: td.function(),
      };

      const Address = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        Addresses:[{
          street: 'asd',
          number: 123,
          neightborhood: 'dsa',
          city: 'sda',
          reference:'sss',
          tell: '123456',
          deleted_at: null,
          created_at: '2017-03-25T18:42:01.6658',
          updated_at: '2017-03-25T18:42:01.6658',
        }],
      }];

      td.when(Client.findOne({  where: { id: 1 }, include: [Address] })).thenResolve(expectedResponse);

      const clientController = new ClientController(Client, Address);
      return clientController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a Client with address: create', () => {
    it('should create a client with address', () => {

      const Client = {
        create: td.function(),
      };

      const Address = {
        create: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
        Addresses:[{
          street: 'asd',
          number: 123,
          neightborhood: 'dsa',
          city: 'sda',
          reference:'sss',
          tell: '123456',
          deleted_at: null,
          created_at: '2017-03-25T18:42:01.6658',
          updated_at: '2017-03-25T18:42:01.6658',
        }],
      }];

      const requestBody = {
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
        Addresses:[{
          street: 'asd',
          number: 123,
          neightborhood: 'dsa',
          city: 'sda',
          reference:'sss',
          tell: '123456',
        }],
      };

      td.when(Client.create(requestBody, {include: [Address] } )).thenResolve(expectedResponse);

      const clientController = new ClientController(Client, Address);
      return clientController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(httpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Create a Client: create', () => {
    it('should create a client', () => {

      const Client = {
        create: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      const requestBody = {
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
      };

      td.when(Client.create(requestBody)).thenResolve(expectedResponse);

      const clientController = new ClientController(Client);
      return clientController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(httpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a client: update', () => {
    it('should update an existig client', () => {

      const Client = {
        update: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
        deleted_at: null,
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      const requestBody = {
        name: 'Default client',
        tell: '123456789',
        cell: '123456789',
      };

      td.when(Client.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const clientController = new ClientController(Client);
      return clientController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a product: delete', () => {
    it('should delete an existing User', () => {
      const Client = {
        destroy: td.function(),
      };

      td.when(Client.destroy({ where: { id: 1 } })).thenResolve({});

      const clientController = new ClientController(Client);
      return clientController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(httpStatus.NO_CONTENT));
    });
  });
});
