var nodemailer = require('nodemailer');
// email sender function
var usermail;
var token;
function setmail(mail){
	usermail = mail;
}
function settoken(tkn){
	token = tkn;
}

exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: false,
		
        auth: {
            user: 'haxfrey@gmail.com',
            pass: 'thehaxpass1'
        }
	});
	
// Definimos el email
var mailOptions = {
    from: 'haxfrey@gmail.com',
    to: usermail,
    subject: 'Asunto',
    text: token
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};
module.exports = {
	setmail,
	settoken
}