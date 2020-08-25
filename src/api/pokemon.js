const express = require("express");
const axios = require("axios");

const router = express.Router();

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let cacheData = [];
let cacheTime;
router.get("/", async (req, res, next) => {
  try {
      let query = '?limit=1048'
    const { data } = await axios.get(BASE_URL+query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/cache", (req, res) => {
  try {
    return res.json(cacheData);
  } catch (error) {
    return res.json(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    let query = req.params.id;
    let foundData = false;
    if (cacheData.length >= 1) {
      console.log("in if " + cacheData.length);
      for (let i = 0; i < cacheData.length; i++) {
        if (query == cacheData[i].id) {
          foundData = true;
          return res.json(cacheData[i]);
        } else {
          foundData = false;
        }
      }
      if (!foundData) {
        const { data } = await axios.get(BASE_URL + query);
        cacheData.push(data);
        return res.json(data);
      }
    } else {
      console.log("in else");
      const { data } = await axios.get(BASE_URL + query);

      cacheData.push(data);
      console.log(cacheData.length);
      return res.json(data);
    }
  } catch (error) {
    return next(error);
  }
  //   res.end();
});
// router.get('/limit/:id', async(req,res,next) =>{
//     try {
//         const limitURL = 'https://pokeapi.co/api/v2/pokemon';
//         let query = `?limit=${req.params.id}`;
//         console.log(limitURL+query);
//         const{data} = await axios.get(limitURL+query);
//         res.json(data);

//     } catch (error) {
//         res.json(error);

//     }
// })

module.exports = router;
