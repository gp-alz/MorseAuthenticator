const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Las credenciales son incorrectas.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {

      
      //enviar
      var { token } = req.body;
      console.log('tokenss: '+token );
      const tok = await User.findOne({token: token});
      console.log('tok: '+tok );
      if(!tok){
        return done(null, false, { message: 'El token es incorrecto.' });
      }else{
        //logear si es correcto
        return done(null, user);
      }

    } else {
      return done(null, false, { message: 'Las credenciales son incorrectas.' });
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
