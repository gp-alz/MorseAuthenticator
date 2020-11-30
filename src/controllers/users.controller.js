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
  const { ced, name, lastname, user, email, password, confirm_password, 
    year, day, month, prov, city, mst, sst, pr1, r1, pr2, r2, pr3, r3 } = req.body;

  //errors
  if (ced == '') {
    errors.push({ text: "El campo cédula está vacío." });
  }else{
    if(ced.length != 10){
      errors.push({ text: "El campo cédula posee mas de 10 números." });
    }
  }
  if (name == '') {
    errors.push({ text: "El campo nombre está vacío." });
  }
  if (lastname == '') {
    errors.push({ text: "El campo apellido está vacío." });
  }
  if (user == '') {
    errors.push({ text: "El campo nombre está vacío." });
  }
  if (email == '') {
    errors.push({ text: "El campo correo está vacío." });
  }
  if (password == '') {
    errors.push({ text: "El campo contraseña está vacío." });
  }else{
    if (password != confirm_password) {
      errors.push({ text: "Las contraseñas no coinciden." });
    }
  }
  if (year == '...') {
    errors.push({ text: "El campo año está vacío." });
  }
  if (month == '...') {
    errors.push({ text: "El campo mes está vacío." });
  }
  if (day == '...') {
    errors.push({ text: "El campo día está vacío." });
  }
  if (prov == '') {
    errors.push({ text: "El campo provincia está vacío." });
  }
  if (city == '') {
    errors.push({ text: "El campo ciudad está vacío." });
  }
  if (mst == '') {
    errors.push({ text: "El campo calle principal está vacío." });
  }
  if (sst == '') {
    errors.push({ text: "El campo calle secundaria está vacío." });
  }
  if (pr1 == 'Seleccione...') {
    errors.push({ text: "La pregunta de seguridad 1 no está seleccionada." });
  }else{
    if (r1 == '') {
      errors.push({ text: "El campo de pregunta de seguridad 1 secundaria está vacío." });
    }
  }
  if (pr2 == 'Seleccione...') {
    errors.push({ text: "La pregunta de seguridad 2 no está seleccionada." });
  }else{
    if (r2 == '') {
      errors.push({ text: "El campo de pregunta de seguridad 2 secundaria está vacío." });
    }
  }
  if (pr3 == 'Seleccione...') {
    errors.push({ text: "La pregunta de seguridad 3 no está seleccionada." });
  }else{
    if (r3 == '') {
      errors.push({ text: "El campo de pregunta de seguridad 3 secundaria está vacío." });
    }
  }
  
  //reset field after error render
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      ced, 
      name, 
      lastname, 
      user, 
      email, 
      password, 
      confirm_password, 
      year,
      month,
      day, 
      prov, 
      city, 
      mst, 
      sst, 
      pr1, 
      r1, 
      pr2, 
      r2, 
      pr3, 
      r3
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo electrónico ya está en uso.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User

     //ced, name, lastname, user, email, password, confirm_password, 
    //year, day, month, prov, city, mst, sst, pr1, r1, pr2, r2, pr3, r3
      var birth = day+month+year;
      var token = 'WLCME';
      const newUser = new User({ ced, name, lastname, user, email, password, 
        birth, prov, city, mst, sst, pr1, r1, pr2, r2, pr3, r3, token});
=======
     
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
        to: email,
        subject: "signup successful",
        text: token,
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





usersCtrl.renderTokenForm = (req, res) => {
  res.render("users/signin");
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
    to: req.user.email,
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
