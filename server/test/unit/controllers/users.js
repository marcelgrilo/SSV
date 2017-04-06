import httpStatus from 'http-status';
import UsersController from '../../../controllers/users';

describe('controllers User', () => {
  describe('Get all Users: getAll', () => {
    it('should return a list of Users', () => {
      const Users = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        login: 'test@test.com',
        password: 'test',
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Users.findAll({})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get all Users: getById', () => {
    it('should return a User', () => {
      const Users = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        login: 'test@test.com',
        password: 'test',
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a user: create', () => {
    it('should create a user', () => {
      const Users = {
        create: td.function(),
      };

      const requestBody = {
        name: 'newtest',
        login: 'newtest@test.com',
        password: 'newtest',
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        login: 'test@test.com',
        password: 'test',
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Users.create(requestBody)).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a user: update', () => {
    it('should update an existig User', () => {
      const Users = {
        update: td.function(),
      };

      const requestBody = {
        name: 'newtest',
        login: 'newtest@test.com',
        password: 'newtest',
      };

      const expectedResponse = [{
        id: 1,
        name: 'test',
        login: 'test@test.com',
        password: 'test',
        created_at: '2017-03-25T18:42:01.6658',
        updated_at: '2017-03-25T18:42:01.6658',
      }];

      td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a user: delete', () => {
    it('should delete an existing User', () => {
      const Users = {
        destroy: td.function(),
      };

      td.when(Users.destroy({ where: { id: 1 } })).thenResolve({});

      const usersController = new UsersController(Users);
      return usersController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(httpStatus.NO_CONTENT));
    });
  });
});
