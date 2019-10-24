// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    firstname: {
      type: DataTypes.STRING(15),
      allowNull:false,
    },
    lastname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    companyid: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasMany(models.companies, {as:"UserID", foreignKey:"userid" });
    //users.belongsTo(models.companies, {as:"CompanyID", foreignKey:"companyid"})
    users.belongsTo(models.roles, {as:"RoleID", foreignKey:"roleid" });
  };

  return users;
};
