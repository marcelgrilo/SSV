import ProductssController from '../controllers/products';

export default (app) => {
  const productsController = new ProductssController(app.datasource.models.Products);
  app.route('/products')
    .get(app.auth.authenticate(), (req, res) => {
      productsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post(app.auth.authenticate(), (req, res) => {
      productsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/products/:id')
    .get(app.auth.authenticate(), (req, res) => {
      productsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put(app.auth.authenticate(), (req, res) => {
      productsController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete(app.auth.authenticate(), (req, res) => {
      productsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
