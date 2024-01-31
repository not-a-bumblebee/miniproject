const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(`postgres://`+process.env.UN+`:`+ process.env.PASSWORD+`@`+process.env.DB_HOSTNAME+`/`+process.env.DB_NAME+"?ssl=true",{dialect:'postgres',protocol:'postgres'})
const Country = sequelize.define('countries', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
}, {
  // Other model options go here
  timestamps:false,
  createdAt:false
});

// `sequelize.define` also returns the model
// console.log(Country === sequelize.models.Country); // true
(async () => {
    await Country.sync();
    // Code here
  })();
module.exports={Country};