// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const transactions = sequelizeClient.define('transactions', {
    transactiontype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    initiatorname:{
      type: DataTypes.STRING,
      allowNull:false
    },
    amount:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    partyA:{
      type: DataTypes.INTEGER(10),
      allowNull:true
    },
    partyB:{
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    reference:{
      type:DataTypes.STRING,
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
  transactions.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    transactions.belongsTo(models.companies,{as:"CompanyTransactions", foreignKey:"companyid"})
  };

  return transactions;
};
