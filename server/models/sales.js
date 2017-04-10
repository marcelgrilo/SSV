export default (sequelize, DataType) => {
  const Sales = sequelize.define('Sales', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isPaid: {
      type: DataType.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
    {
      paranoid: true,
      classMethods: {
        associate: (models) => {
          Sales.belongsTo(models.Users);
          Sales.belongsTo(models.Clients);
          Sales.belongsTo(models.Addresses);
          Sales.hasMany(models.SaleItems);
        },
      },
    });
  return Sales;
};
