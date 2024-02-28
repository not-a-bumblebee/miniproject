const express = require('express')
const router = express.Router();
const { Country } = require('../models/country');

let country = Country

router.get('/country', async (req, res) => {
    try {
        let all = await country.findAll();
        res.status(200).json(all);
        
    } catch (error) {
        console.log(error);
    }
})
router.post('/country', async (req, res) => {

    try {
        let post = req.body;

        let insert = await country.create(post)

        res.status(200).json(insert);

    } catch (error) {
        console.error(error);
        res.json({error:"duplicate ID"})
    }
})
router.delete('/country/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let deleted = await country.destroy({where:{id:id}});
        res.status(200).send('')
        
    } catch (error) {
        res.status(404).send("error")
    }
})

module.exports = router;
