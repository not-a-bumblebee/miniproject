const express = require('express')
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

const { Country } = require('../models/country');
const { Currency } = require('../models/currency');
require('dotenv').config()
const sequelize = new Sequelize(`postgres://`+process.env.UN+`:`+ process.env.PASSWORD+`@`+process.env.DB_HOSTNAME+`/`+process.env.DB_NAME+"?ssl=true",{dialect:'postgres',protocol:'postgres'})

let country = Country;
let currency = Currency;

router.get('/currency-countryName', async(req,res)=>{
    try {

        
        const [results, metadata] = await sequelize.query(`SELECT currencies."currencyCode",countries."name" FROM currencies JOIN countries ON currencies."countryId" = countries."id"`);
        console.log(results);
        res.status(200).json(results);
        
        

    } catch (error) {
        console.error(error);
    }



})
module.exports = router;
