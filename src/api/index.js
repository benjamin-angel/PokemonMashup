const express = require('express');
const pokemon = require('./pokemon');
const measure = require('./MeasureAPI');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'From here I need to make pokemon accessible',
    'End point': "/pokemon"
  });
});

router.use('/pokemon',pokemon);
router.use('/measure',measure)
module.exports = router;
