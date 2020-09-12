const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.ETSYAPI;
const BASE_URL = `https://openapi.etsy.com/v2/listings/active?api_key=${apiKey}`;
//https://openapi.etsy.com/v2/listings/active?api_key=s5s80vix8zx9p5xqnakfouim&title=pokemon
router.get("/", async (req, res, next) => {
  res.json({
    message: "use /etsy/*pokemon-name*",
  });
});

router.get("/:id", async (req, res, next) => {
  try {
    let query = req.params.id;
    console.log("This is query" + query);
    const { data } = await axios.get(
      BASE_URL + `&keywords=${query}&includes=Images:1`
    );
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
