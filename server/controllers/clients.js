import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse(
  { error: message },
  statusCode);

class ClientsController {
  constructor(Clients, Addresses) {
    this.Clients = Clients;
    this.Addresses = Addresses;
  }

  getAll() {
    return this.Clients.findAll({ include: [this.Addresses] })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Clients.findOne({ where: params, include: [this.Addresses]  })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    if(data.Addresses){
        return this.Clients.create(data, {include: [this.Addresses] })
        .then(result => defaultResponse(result, HttpStatus.CREATED))
        .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }
    else{
      return this.Clients.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }
  }

  update(data, params) {
    return this.Clients.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Clients.destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default ClientsController;
