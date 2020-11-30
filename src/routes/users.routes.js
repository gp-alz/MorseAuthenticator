const router = require("express").Router();
var EmailCtrl = require('../morse');

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  renderTokenForm,
  signin,
  secQuest,
  recPass,
  recToken,
  tokencomp,
  logout
} = require("../controllers/users.controller");

//auh
const { isAuthenticated } = require("../helpers/auth");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

router.post("/users/secretQuest", secQuest);

router.get("/users/recoverPassword", recPass);

router.get("/users/recoverToken", recToken);

router.get("/users/token", isAuthenticated, tokencomp); //warning with auth

//email route
router.post('/email', function(req,res){
  EmailCtrl.sendEmail
});

module.exports = router;
