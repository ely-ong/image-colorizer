const router = require('express').Router();
const indexController = require('../controllers/indexController')

const multer = require('multer');

//for uploading files with multer
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.get('/', indexController.getHomepage);
router.get('/colorizer', indexController.getColorizer);
router.get('/colorizer/:original/:colorized', indexController.getColorizer);
router.post('/colorize', upload.single('imageURL'), indexController.postColorizer);
router.post('/colorizeImage', upload.single('imageURL'), indexController.colorizeImage);
router.get('/about', indexController.getAbout);
router.get('*', indexController.getError);

module.exports = router;
