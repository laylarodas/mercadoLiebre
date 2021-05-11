'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.categories_users,{
        as: 'CategoryUser',
        foreignKey: 'category_user_id'
      });

      this.belongsTo(models.categories_users,{
        as: 'profileUser',
        foreignKey: 'profileId'
      });

    }
  };
  users.init({
    fullName: DataTypes.STRING,
    userName: DataTypes.STRING,
    date: DataTypes.DATE,
    address: DataTypes.STRING,
    profileId: DataTypes.INTEGER,
    category_user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};