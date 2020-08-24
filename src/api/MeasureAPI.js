const express = require("express");
const axios = require("axios");
const router = express.Router();
const ip = require('ip');

console.dir(ip.address());
const apiKey = process.env.MEASUREAPI;
const BASE_URL = `http://mot-api.bluebulbprojects.com/v1/units/weight/`;

router.get("/", (req, res) => {
  //   try {
  //     //   const params = new URLSearchParams({
  //     //     measure: 'weight',
  //     //     unit: 'kgms',
  //     //     amount: 100,
  //     //     key: apiKey
  //     //   });
  //     // res.json(work);
  //     const { data } = await axios.get(`${BASE_URL}${query}`);

  //     res.json(data);
  //   } catch (error) {
  //     res.json(error);
  //     next(error);
  //   }

    //   const { data } = axios.get(`${BASE_URL}${query}`).then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   console.log(data);
    res.json({
        message: "End points not working"
    })
});

module.exports = router;
