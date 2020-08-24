const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/1';
router.get('/', async (req, res, next) => {
    try{
        const {data} = await axios.get(BASE_URL);
        res.json(data);

    }catch(error){
        next(error);

    }
});

module.exports = router;
