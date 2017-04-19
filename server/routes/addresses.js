import AddressesController from '../controllers/addresses';

export default (app) => {
  const addressesController = new AddressesController(app.datasource.models.Addresses);

  app.route('/addresses')
    .get(app.auth.authenticate(), (req, res) => {
      addressesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post(app.auth.authenticate(), (req, res) => {
      addressesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/addresses/:id')
    .get(app.auth.authenticate(), (req, res) => {
      addressesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put(app.auth.authenticate(), (req, res) => {
      addressesController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete(app.auth.authenticate(), (req, res) => {
      addressesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
