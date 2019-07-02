module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      noEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      noEmpty: true
    },
    phone: {
      type: DataTypes.STRING,
      noEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      noEmpty: true
    }
  });
  return User;
};
