import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

// função para carregar os models dinamicamente no banco.
const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);

    models[model.name] = model;
  });
  return models;
};

export default (app) => {
  // caso o database nao esteja inicializado
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params);

    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize);

    Object.keys(database.models).forEach((modelName) => {
      if ('associate' in database.models[modelName]) {
        database.models[modelName].associate(database.models);
      }
    });

    sequelize.sync().done(() =>
      // isto garante que cada vez que se iniciar a aplicaçao, o database será sincronizado
       database);
  }
  // caso o database ja tenha sido inicializado apenas retorna;
  return database;
};
