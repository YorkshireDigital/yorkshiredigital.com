module.exports = function setup(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: {    type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'users',
    timestamps: true,
    indexes: [{
      unique: true,
      fields: ['email']
    }]
  }
  );
  return User;
};
