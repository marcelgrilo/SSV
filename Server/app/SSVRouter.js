
//Router for the
import { Router } from 'express';
import SSVUserController from './Controllers/SSVUserController';
import SSVClientController from './Controllers/SSVClientController';
import SSVAddressController from './Controllers/SSVAddressController';

const ssvRouter = Router();
const userController = new SSVUserController();
const clientController = new SSVUserController();
const addressController = new SSVAddressController();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
ssvRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});



// User GET,PUT,POST and DELETE
//GET /api/ssv/user/?user=<number>&limit=<number>&offset=<number>&query=<string>
ssvRouter.get('/api/ssv/user/', userController.find.bind(controller));
//POST /api/ssv/user/ {login: <string>, psw: <string>, name: <stringl> } - create a new
ssvRouter.post('/api/ssv/user/', userController.create.bind(controller));
//PUT /api/ssv/user/user1/pswxyz { login: <string>, psw: <string>, name: <stringl> } - edit existent
ssvRouter.put('/api/ssv/user/:userId/:userPSW', userController.update.bind(controller));
// DElETE /api/ssv/user/user1/pswxyz {usderId: <number>} - delete an user of the users list
ssvRouter.delete('/api/ssv/user/:userId', userController.delete.bind(controller));

// Client GET,PUT,POST and DELETE
//GET /api/ssv/client/ ?client=<clientId>&limit=<number>&offset=<number>&query=<string>
ssvRouter.get('/api/ssv/client/', clientController.find.bind(controller));
//POST /api/ssv/client/user1 { name: <string>, telephone: <string>, celephone: <string> } - create a new
ssvRouter.post('/api/ssv/client/:userId', clientController.create.bind(controller));
//PUT /api/ssv/user/user1/client1 { name: <string>, telephone: <string>, celephone: <string> } - edit existent
ssvRouter.put('/api/ssv/client/:userId/:clientId', clientController.update.bind(controller));
// DElETE /api/ssv/user/user1/client1 - delete an user of the users list
ssvRouter.delete('/api/ssv/client/:userId/:clientId', clientController.delete.bind(controller));

// Address GET,PUT,POST and DELETE
//GET /api/ssv/address/ ?client=<clientId>&limit=<number>&offset=<number>&query=<string>
ssvRouter.get('/api/ssv/address/', addressController.find.bind(controller));
//POST /api/ssv/address/client1 { clientId: <string>, street: <string>, neighborhood: <string>, city: <string>} - create a new
ssvRouter.post('/api/ssv/address/:client/', addressController.create.bind(controller));
//PUT /api/ssv/user/addr1/client1 { street: <string>, neighborhood: <string>, city: <string> } - edit existent
ssvRouter.put('/api/ssv/address/:addressId/:clientId', addressController.update.bind(controller));
// DElETE /api/ssv/user/user1/client1 - delete an user of the users list
ssvRouter.delete('/api/ssv/address/:addressId/:clientId', addressController.delete.bind(controller));

// Product GET,PUT,POST and DELETE

// Descount GET,PUT,POST and DELETE

// Sale GET,PUT,POST and DELETE

// Sale_Product GET,PUT,POST and DELETE

export default ssvRouter;
