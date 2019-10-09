// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const companies = sequelizeClient.define('companies', {
    companyid:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    company_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    company_location: {
      type: DataTypes.STRING(40),
      allowNull:false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  companies.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    companies.belongsTo(models.users, {
      as:"CompanyID",
      foreignKey:"companyid"
    });
  };

  return companies;
};
