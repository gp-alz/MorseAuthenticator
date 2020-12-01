const usersCtrl = {};

var tokenModule = require('../morse');

const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
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
      

     
      var t1 = Math.floor(Math.random() * (90 -65 + 1) + 65);
      var t2 = Math.floor(Math.random() * (90 -65 + 1) + 65);
      var t3 = Math.floor(Math.random() * (90 -65 + 1) + 65);
      var t4 = Math.floor(Math.random() * (90 -65 + 1) + 65);
      var token = String.fromCharCode(t1, t2, t3, t4);
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ServicioDeAutenticacion@gmail.com',
            pass: 'authservice'
        }
      });


      let message = {
        from: 'ServicioDeAutenticacion@gmail.com',
        to: email,
        subject: "Se ha registrado con exito",
        text: 'Su token de acceso es: '+token,
      };

      transporter
        .sendMail(message)
        .then(() => {
          return res
            .status(200)
            .json({ msg: "Email de Autenticación" });
        })
        .catch((error) => console.error(error));
      
   

      var birth = day+month+year;
      const newUser = new User({ ced, name, lastname, user, email, password, 
        birth, prov, city, mst, sst, pr1, r1, pr2, r2, pr3, r3, token});

      newUser.password = await newUser.encryptPassword(password);
      await newUser.save(); 
      req.flash("success_msg", "Registro exitoso, Su token de acceso ha sido enviado a su correo electrónico");
      res.redirect("/users/signin");
    }
  }
};





usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin",);
};



usersCtrl.signin = (req, res) => {

  let errors = [];
  const { email, password } = req.body;

  //errors
  
  if (email == '') {
    errors.push({ text: "El campo correo está vacío." });
  }
  if (password == '') {
    errors.push({ text: "El campo contraseña está vacío." });
  }
  //reset field after error render
  if (errors.length > 0) {
    res.render("users/signin", {
      errors,
      email, 
      password
    });
  }else{
    const { email, password} = req.body;
    res.render("users/token",  {email, password});
  }

}


usersCtrl.secQuest = (req, res) => {
const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var cb;
const  inputmail  = req.body.email;
mongoose.connection.db.collection('users', function(err, collection){
  collection.find({email:inputmail},{pr1:0}).toArray(function(err, result){
    if(err) throw res.redirect("/users/signin");
    console.log(result[0].pr1);
    var number = Math.floor(Math.random() * 3) + 1;
    var expresion = 'result[0].pr' + number.toString();
   
    res.render("users/secretQuest", {pregunta: eval(expresion)}); 
  });
});
}


usersCtrl.recPass = (req, res) => {
  res.render("users/recoverPassword");
};

usersCtrl.recToken = (req, res) => {
  res.render("users/recoverToken");
};



usersCtrl.tokencomp = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true
});



//logout
usersCtrl.logout = async (req, res) => {
  
  var t1 = Math.floor(Math.random() * (90 -65 + 1) + 65);
  var t2 = Math.floor(Math.random() * (90 -65 + 1) + 65);
  var t3 = Math.floor(Math.random() * (90 -65 + 1) + 65);
  var t4 = Math.floor(Math.random() * (90 -65 + 1) + 65);

  var token = String.fromCharCode(t1, t2, t3, t4);

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ServicioDeAutenticacion@gmail.com',
        pass: 'authservice'
    }
  });

  let message = {
    from: 'ServicioDeAutenticacion@gmail.com',
    to: req.user.email,
    subject: "Ha cerrado sesión con exito",
    text: 'Su nuevo token de acceso es: '+token,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "Email de autenticación" });
  }).catch((error) => console.error(error));
  
  const  inputmail  = req.user.email;

  console.log('asdasd: '+inputmail);

  const emailUser = await User.findOne({ email: inputmail });
  
  console.log('sdasdads: ',emailUser);

  const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
    mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.db.collection('users',function(err,collection){
    ({ _id: emailUser._id}, {$set:{"token": token}});
    collection.updateOne({ _id: emailUser._id}, {$set:{"token": token}});
  });
  

  req.logout();
  req.flash("success_msg", "Has cerrado sesión con exito.");
 
  res.redirect("/users/signin");
};


module.exports = usersCtrl;
