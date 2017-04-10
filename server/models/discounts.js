export default (sequelize, DataType) => {
  const Discounts = sequelize.define('Discounts', {
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
    value: {
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
          Discounts.belongsTo(models.Users);
        },
      },
    });


  return Discounts;
};
