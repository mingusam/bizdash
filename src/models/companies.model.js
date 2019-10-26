// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const companies = sequelizeClient.define('companies', {
    userid:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    company_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    company_location: {
      type: DataTypes.STRING(40),
      allowNull:false
    },
    mpesapaybill_no:{
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    airtelpaybill_no:{
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    account_no:{
      type:DataTypes.INTEGER(20),
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
    companies.belongsTo(models.users, {as:"UserID", foreignKey:"userid" });
    //companies.hasMany(models.users, {as:"CompanyID", foreignKey:"companyid"});
    companies.hasMany(models.transactions, {as:"CompanyTransactions", foreignKey:"companyid"})
  };

  return companies;
};
