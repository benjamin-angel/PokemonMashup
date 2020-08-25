const express = require("express");
const axios = require("axios");
const router = express.Router();
const ip = require("ip");

console.dir(ip.address());
const apiKey = process.env.MEASUREAPI;
const BASE_URL = `http://mot-api.bluebulbprojects.com/v1/testitems/search?measure=weight&unit=lbs&amount=100&key=${apiKey}`;

router.get("/", async (req, res, next) => {
  console.log(BASE_URL);
  try {
    const { data } = await axios.get(BASE_URL);
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
