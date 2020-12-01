const router = require("express").Router();
var EmailCtrl = require('../morse');

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  secQuest,
  recPass,
  recToken,
  secQuestT,
  tokencomp,
  logout,
  resPass,
  recoverPass,
  recoverToken,
  savePass
} = require("../controllers/users.controller");

//auh
const { isAuthenticated } = require("../helpers/auth");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signinnn", recoverPass);

router.post("/users/signinn", recoverToken);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

router.post("/users/secretQuest", secQuest);

router.post("/users/secretQuestT", secQuestT);

router.get("/users/recoverPassword", recPass);

router.get("/users/recoverToken", recToken);

router.post("/users/resetPass", resPass);

router.post("/users/savePass", savePass);

router.post("/users/token", tokencomp); 

//email route
router.post('/email', function(req,res){
  EmailCtrl.sendEmail
});

module.exports = router;
