'use strict';
const { Model } = require('sequelize');

const byscript = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Store);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidPassword(value) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])/;
            if (!passwordRegex.test(value)) {
              throw new Error(
                'Password must be at least 8 characters long, and include at least one uppercase letter, one number, and one special character'
              );
            }
          },
        },
      },
      role: DataTypes.ENUM('SELLER', 'BUYER'),
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate(async (user) => {
    const salt = await byscript.genSalt(10);
    const hash = await byscript.hash(user.password, salt);
    user.password = hash;
  });

  return User;
};
