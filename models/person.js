'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    biography: DataTypes.TEXT,
    hairColorId: DataTypes.INTEGER
  }, {});
  Person.associate = function(models) {
    Person.belongsTo(models.HairColer, { foreignKey: 'hairColorId' });
  };
  return Person;
};
