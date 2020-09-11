const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.ETSYAPI;

const baseUrl = "https://openapi.etsy.com/v2/";

router.get("/", async (req, res, next) => {

  
res.json({
  Message : "Go home"
});
  
});

module.exports = router;
