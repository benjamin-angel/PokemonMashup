const express = require("express");
const pokemon = require("./pokemon");
const etsy = require("./etsy");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "From here I need to make pokemon accessible",
    "End point 1": "/pokemon",
    "End point 2": "/etsy",
  });
});

router.use("/pokemon", pokemon);
router.use("/etsy", etsy);
module.exports = router;
