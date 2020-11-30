const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Porfavor, Inicie sesión.');
  res.redirect('/users/signin');
};

module.exports = helpers;
