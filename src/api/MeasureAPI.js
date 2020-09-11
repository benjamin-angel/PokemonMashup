// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const ip = require("ip");

// console.dir(ip.address());
// const apiKey = process.env.MEASUREAPI;
// const BASE_URL = `http://mot-api.bluebulbprojects.com/v1/getmyhost`;

// router.get("/", async (req, res, next) => {
//   console.log(BASE_URL);
//   // try {
//   //   // console.log(req);
//   //   const { data } = await axios.get(BASE_URL);
//   //   console.log(data);
//   // } catch (error) {
//   //   return next(error);
//   // }
//   axios.get(`http://mot-api.bluebulbprojects.com/v1/items/search?measure=weight&unit=lbs&amount=100&key=${apiKey}`)
//   .then(function (response){
//     console.log(response.data);
//   })
//   .catch(function (error){
//     console.log(error);
//   })
//   .then(function () {
//     console.log("finished");
//   })
// res.json({
//   Message : "Go home"
// });
  
// });

// module.exports = router;
