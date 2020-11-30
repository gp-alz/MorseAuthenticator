const usersCtrl = {};

var tokenModule = require('../morse');

const nodemailer = require("nodemailer");

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo electrónico ya está en uso.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
     
      
      
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'haxfrey@gmail.com',
            pass: 'thehaxpass1'
        }
      });


      let message = {
        from: 'haxfrey@gmail.com',
        to: emailUser,
        subject: "signup successful",
        text: 'Wusup bud? ',
      };

      transporter
        .sendMail(message)
        .then(() => {
          return res
            .status(200)
            .json({ msg: "you should receive an email from us" });
        })
        .catch((error) => console.error(error));
      
   

      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro exitoso.");
      res.redirect("/users/signin");

        


    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/users/token",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.tokencomp = (req, res) => {
  res.render("users/token");
};

usersCtrl.logout = (req, res) => {


  var t1 = Math.floor(Math.random() * (90 -64 + 1) + 64);
  var t2 = Math.floor(Math.random() * (90 -64 + 1) + 64);
  var t3 = Math.floor(Math.random() * (90 -64 + 1) + 64);
  var t4 = Math.floor(Math.random() * (90 -64 + 1) + 64);

  var token = String.fromCharCode(t1, t2, t3, t4);

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'haxfrey@gmail.com',
        pass: 'thehaxpass1'
    }
  });

  let message = {
    from: 'haxfrey@gmail.com',
    to: 'ormax563jj@gmail.com',
    subject: "logout successful",
    text: token,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
  }).catch((error) => console.error(error));
  

  req.logout();
  req.flash("success_msg", "Has cerrado sesión con exito.");
 
  res.redirect("/users/signin");
};

module.exports = usersCtrl;
