export default (sequelize, DataType) => {
  const SaleItems = sequelize.define('SaleItems', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataType.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    calculatedPrice: {
      type: DataType.FLOAT,
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
          SaleItems.belongsTo(models.Products);
          SaleItems.belongsTo(models.Discounts);
          SaleItems.belongsTo(models.Sales);
        },
      },
    });
  return SaleItems;
};
