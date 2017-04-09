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
          Products.belongsTo(models.Users);
          Products.hasMany(models.Adrdresses);
        },
      },
    });


  return Products;
};
