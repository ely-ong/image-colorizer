const router = require('express').Router();
const indexController = require('../controllers/indexController')

router.get('/', indexController.getHomepage);
router.get('/colorizer', indexController.getColorizer);
router.get('/about', indexController.getAbout);
router.get('*', indexController.getError);

module.exports = router;
