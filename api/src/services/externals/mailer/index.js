
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

//Etape 1
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user:"test.api.mailer@gmail.com",
      pass:"lhqbdxcjtkddetbh"
    }
}); 

transporter.use('compile',hbs({
  viewEngine: {
      extname: '.handlebars',
      layoutsDir: 'mail/',
      defaultLayout : 'index',
  },
  viewPath: 'mail/'
}))

//Etape 2
let mailOptions = {
  from:'test.api.mailer@gmail.com',
  to: 'test.api.mailer@gmail.com',
  subject:'Testing and testing',
  text:'ça marche!',
  template:'index'
}; 

//Etape 3 
transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
      console.log('Error', err);
  } else {
      console.log('Email envoye!!!');
  }
});