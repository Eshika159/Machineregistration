var express = require('express');
var router = express.Router();
var user_controller=require('../controllers/userController');



router.get('/login',function(req,res,next){
  res.render('login');
});


router.post('/login',user_controller.login);

router.get('/logout',user_controller.logout);

router.get('/profile',user_controller.profile);

router.post('/update',user_controller.update);

router.post('/change',user_controller.change);



router.post('/forgot',user_controller.forgot);

router.get('/reset/:token',user_controller.reset1);
router.post('/reset/',user_controller.reset);

module.exports = router;
