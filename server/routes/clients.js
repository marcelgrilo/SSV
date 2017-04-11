import ClientssController from '../controllers/clients';

export default (app) => {
  const clientsController = new ClientssController(
    app.datasource.models.Clients,
    app.datasource.models.Addresses,
  );

  app.route('/clients')
    .get(app.auth.authenticate(), (req, res) => {
      clientsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post(app.auth.authenticate(), (req, res) => {
      clientsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/clients/:id')
    .get(app.auth.authenticate(), (req, res) => {
      clientsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put(app.auth.authenticate(), (req, res) => {
      clientsController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete(app.auth.authenticate(), (req, res) => {
      clientsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
