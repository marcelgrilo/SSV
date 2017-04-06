import UsersController from '../controllers/users';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.Users);
  app.route('/users')
    .get(app.auth.authenticate(), (req, res) => {
      usersController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      usersController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/users/:id')
    .get(app.auth.authenticate(), (req, res) => {
      usersController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put(app.auth.authenticate(), (req, res) => {
      usersController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete(app.auth.authenticate(), (req, res) => {
      usersController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
