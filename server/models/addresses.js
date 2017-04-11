export default (sequelize, DataType) => {
  const Addresses = sequelize.define('Addresses', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    number: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    neightborhood: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reference: {
      type: DataType.STRING,
    },
    tell: {
      type: DataType.STRING,
    },
  },
    {
      paranoid: true,
      classMethods: {
        associate: (models) => {
          Addresses.belongsTo(models.Clients, {foreignKey : 'client_id'});
        },
      },
    });


  return Addresses;
};
