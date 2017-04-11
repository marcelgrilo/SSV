export default (sequelize, DataType) => {
  const Clients = sequelize.define('Clients', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tell: {
      type: DataType.STRING,
    },
    cell: {
      type: DataType.STRING,
    },
  },
    {
      paranoid: true,
      classMethods: {
        associate: (models) => {
          Clients.belongsTo(models.Users);
          Clients.hasMany(models.Addresses, {foreignKey : 'client_id'});
        },
      },
    });


  return Clients;
};
