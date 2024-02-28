require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`postgres://`+process.env.UN+`:`+ process.env.PASSWORD+`@`+process.env.DB_HOSTNAME+`/`+process.env.DB_NAME+"?ssl=true",{dialect:'postgres',protocol:'postgres'})
const {Country} = require('../models/country')

 const Currency = sequelize.define('currency', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true,
        autoIncrement:true
    },
    currencyCode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    countryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Country,
            key:'id',

        }
    },
    conversionRate:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            isNumeric:true
        }
    },
}, {
  // Other model options go here
  timestamps:false,
  createdAt:false
});
// Currency.update()
(async () => {
    await Currency.sync();
    // Code here
  })();
// `sequelize.define` also returns the model

// Currency.hasOne(Country,{foreignKey:'countryId'})
// Country.belongsTo(Currency)
module.exports = {Currency};