export default (sequelize, DataType) => {
  const Products = sequelize.define('Products', {
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
    price: {
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
          Products.belongsTo(models.Users);
        },
      },
    });


  return Products;
};
