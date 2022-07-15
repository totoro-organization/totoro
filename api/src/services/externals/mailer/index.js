
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
<<<<<<< HEAD
var onlyPath = process.cwd();

module.exports = {
  sendMail: function (page, headerMail, contentMail) {
    const {to, subject} = headerMail
    contentMail = {
      ...contentMail, 
      base_url: process.env.API_BASE_URL, 
      landing_page: process.env.LANDING_PAGE_URL,
      web_app: process.env.WEB_APP_URL,
      back_office: process.env.BO_URL
    }


    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    }); 

    transporter.use('compile',hbs({
      viewEngine: {
          extname: '.handlebars',
          layoutsDir: onlyPath+"/public/views/templates-mail/",
          defaultLayout : "template",
          partialsDir : onlyPath+"/public/views/templates-mail/partials/"
      },
      viewPath: `${onlyPath}/public/views/templates-mail/`
    }))

    const mailOptions = {
      from: `Totoro <${process.env.MAILER_USER}>`,
      to,
      subject,
      template: page+".body",
      text: "Hello. This email is not spam.",
      context: contentMail
    }; 


    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
          console.log('Error', err);
      } else {
          console.log('Email envoye!!!');
      }
      transporter.close();
    });
  },
}
  
=======

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
>>>>>>> webapp
