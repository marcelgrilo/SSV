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
    isDeleted: {
      type: DataType.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    classMethods: {
      associate: (models) => {
        Products.belongsTo(models.Users);
      },
    },
  });


  return Products;
};
