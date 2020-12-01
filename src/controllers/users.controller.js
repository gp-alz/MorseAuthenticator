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

usersCtrl.recoverToken = async (req,res) =>{

  let errors = [];
  var email = req.body.email;
  var answer = req.body.answer; 
  var number = req.body.number;
  //errors
  var resp = 'r'+number;
  if (answer == '') {
    errors.push({ text: "El campo de respuesta está vacío." });
  }
  //reset field after error render
  if (errors.length > 0) {
    res.render("users/secretQuestT", {
      errors,
      answer
    });
  }else{
  
    const MONGODB_URI = `mongodb://localhost:27017/tareas}`;

    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      var query = {};
      query[resp] = answer;

    mongoose.connection.db.collection('users', function(err, collection){
      collection.findOne(query).then(async (result)=>{
      if (result != null){
        
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
          to: req.body.email,
          subject: "Recuperación de Token",
          text: 'Su nuevo token de acceso es: '+token,
        };
        

        const  inputmail  = req.body.email;
        const emailUser = await User.findOne({ email: inputmail });

        const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
          mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        mongoose.connection.db.collection('users',function(err,collection){
          ({ _id: emailUser._id}, {$set:{"token": token}});
          collection.updateOne({ _id: emailUser._id}, {$set:{"token": token}});
        });

        transporter
          .sendMail(message)
          .then(() => {
            return res
              .status(200)
              .json({ msg: "Email de autenticación" });
        }).catch((error) => console.error(error));
        req.flash("warning_msg", "Se ha enviado un nuevo token a su correo en caso de que sus credenciales sean correctas");
        res.redirect("/users/signin");
      }else{
        req.flash("warning_msg", "Se ha enviado un nuevo token en caso de que sus credenciales sean correctas");
        res.redirect("/users/signin");
      }
        
      }).catch((err)=>{
        console.log(err);
      });
    });
  }
}




//rec PASS
usersCtrl.recoverPass = async (req,res) =>{

  let errors = [];
  var email = req.body.email;
  var answer = req.body.answer; 
  var number = req.body.number;
  //errors
  console.log('email: '+email)
  var resp = 'r'+number;
  if (answer == '') {
    errors.push({ text: "El campo de respuesta está vacío." });
  }
  //reset field after error render
  if (errors.length > 0) {
    res.render("users/secretQuest", {
      errors,
      answer
    });
  }else{
    
    console.log('email: '+email)
    const MONGODB_URI = `mongodb://localhost:27017/tareas}`;

    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      var query = {};
      query[resp] = answer;
    mongoose.connection.db.collection('users', function(err, collection){
      collection.findOne(query).then(async (result)=>{

        console.log(result);
      if (result != null){
        
        res.render("users/recoToken", {email});

      }else{

        errors.push({ text: "La respuesta ingresada no coincide con nuestros registros" });
        res.render("users/recoverPassword", {
          errors,
          email
        });
      }
        
      }).catch((err)=>{
        console.log(err);
      });
    });
  }
}




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
  if (confirm_password == '') {
    errors.push({ text: "El campo confirmar contraseña está vacío." });
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

  let errors = [];
  const { email} = req.body;

  //errors
  
  if (email == '') {
    errors.push({ text: "El campo correo está vacío." });
  }
  //reset field after error render
  if (errors.length > 0) {
    res.render("users/recoverPassword", {
      errors,
      email
    });
  }else{
    const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    const  inputmail  = req.body.email;
    mongoose.connection.db.collection('users',async function(err, collection){
      
      //test if exist
      var search = await collection.findOne({email:inputmail});
      

      if(!search){

        errors.push({ text: "El correo electrónico no existe" });
        res.render("users/recoverPassword", {
          errors,
          email
        });

      }else{
        collection.find({email:inputmail},{pr1:0}).toArray(function(err, result){
          if(err) throw res.redirect("/users/signin");
          var number = Math.floor(Math.random() * 3) + 1;
          var expresion = 'result[0].pr' + number.toString();
        
          res.render("users/secretQuest", {pregunta: eval(expresion), email: inputmail, number}); 
        });
      }


    });
  }

}


usersCtrl.secQuestT = (req, res) => {

  let errors = [];
  const { email} = req.body;

  //errors
  
  if (email == '') {
    errors.push({ text: "El campo correo está vacío." });
  }
  //reset field after error render
  if (errors.length > 0) {
    res.render("users/recoverToken", {
      errors,
      email
    });
  }else{
    const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    const  inputmail  = req.body.email;
    mongoose.connection.db.collection('users',async function(err, collection){
      
      //test if exist
      var search = await collection.findOne({email:inputmail});
      

      if(!search){

        errors.push({ text: "El correo electrónico no existe" });
        res.render("users/recoverToken", {
          errors,
          email
        });

      }else{
        collection.find({email:inputmail},{pr1:0}).toArray(function(err, result){
          if(err) throw res.redirect("/users/signin");
          var number = Math.floor(Math.random() * 3) + 1;
          var expresion = 'result[0].pr' + number.toString();
        
          res.render("users/secretQuestT", {pregunta: eval(expresion), email: inputmail, number}); 
        });
      }


    });
  }

}


usersCtrl.recPass = (req, res) => {
  var email = req.body.email;
  res.render("users/recoverPassword", email);
};

usersCtrl.recToken = (req, res) => {
  var email = req.body.email;
  res.render("users/recoverToken", {email: email});
};


usersCtrl.tokencomp = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true
});




usersCtrl.savePass = async(req, res) => {


  let errors = [];
  const {email, password, confirm_password} = req.body;

  if (password == '') {
    errors.push({ text: "El campo contraseña está vacío." });
  }else{
    if (password != confirm_password) {
      errors.push({ text: "Las contraseñas no coinciden." });
    }
  }
  if (errors.length > 0) {
    res.render("users/resetPass", {
      errors,
      password, 
      confirm_password, 
    });
  } else {

    
    const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });  
    console.log('email: '+email)
    mongoose.connection.db.collection('users', function(err, collection){
    collection.findOne({email: email}).then(async (result)=>{
      
      if (result != null){
        
        if(result.email == email){


          //collection
          const encriptedPass = new User({password});
          encriptedPass.password = await encriptedPass.encryptPassword(password);
          mongoose.connection.db.collection('users',function(err,collection){
            collection.updateOne({ _id: result._id}, {$set:{"password": encriptedPass.password}});
          });
          


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
            to: req.body.email,
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
          
          const  inputmail  = req.body.email;


          const emailUser = await User.findOne({ email: inputmail });
          

          const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
            mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });

          mongoose.connection.db.collection('users',function(err,collection){
            
            collection.updateOne({ _id: emailUser._id}, {$set:{"token": token}});
          });
  


          errors.push({ text: "Su contraseña se ha actualizado con exito" });
          errors.push({ text: "Su nuevo token ha sido enviado a su correo electrónico" });
          res.render("users/signin", {
          errors
          });





        }else{
          errors.push({ text: "No se ha encontrado al correo" });
          res.render("users/recoverPassword", {
          errors,
          email
          });
        }




      }else{
        errors.push({ text: "No se ha encontrado al usuario." });
        res.render("users/recoverPassword", {
          errors,
          email
        });
      }
    });
    });

  }

  
};




//test Token and sent to ResPassPage
usersCtrl.resPass = (req, res) => {

  var email = req.body.email;
  var token = req.body.token;
  let errors = [];
  console.log('emailasdas: '+email)
  const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
    mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });  
  console.log("Email "+email);
  console.log("Token "+token);
  mongoose.connection.db.collection('users', function(err, collection){
    collection.findOne({token: token}).then(async (result)=>{
      console.log (result.email);
        console.log (email);
      console.log(result);
      if (result != null){
        
        if(result.email == email){
          res.render("users/resetPass", {email: email});
        }else{
          errors.push({ text: "El token ingresado no coincide" });
          res.render("users/recoverPassword", {
          errors,
          email
          });
        }
      }else{
        errors.push({ text: "El token ingresado es incorrecto." });
        res.render("users/recoverPassword", {
          errors,
          email
        });
      }
    });
  });
}

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


  const emailUser = await User.findOne({ email: inputmail });
  

  const MONGODB_URI = `mongodb://localhost:27017/tareas}`;
    mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.db.collection('users',function(err,collection){
    
    collection.updateOne({ _id: emailUser._id}, {$set:{"token": token}});
  });
  

  req.logout();
  req.flash("success_msg", "Ha cerrado sesión con exito, su nuevo token ha sido enviado a su correo electrónico");
 
  res.redirect("/users/signin");
};


module.exports = usersCtrl;