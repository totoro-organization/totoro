
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
var onlyPath = process.cwd();

module.exports = {
  sendMail: async function (template, headerMail, contentMail) {
    const {to, subject} = headerMail
    contentMail = {...contentMail, logo: process.env.API_BASE_URL+"/totoro-logo.svg"}
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
          defaultLayout : template,
      },
      viewPath: `${onlyPath}/public/views/templates-mail/`
    }))

    const mailOptions = {
      from: process.env.MAILER_USER,
      to,
      subject,
      template,
      context: contentMail
    }; 


    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
          console.log('Error', err);
      } else {
          console.log('Email envoye!!!');
      }
    });
  },
}
  