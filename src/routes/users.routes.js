const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  tokencomp,
  logout
} = require("../controllers/users.controller");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

router.get("/users/token", tokencomp);

var EmailCtrl = require('../morse');

//email route
router.post('/email', function(req,res){
  EmailCtrl.sendEmail
});

module.exports = router;
