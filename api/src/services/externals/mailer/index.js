
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
var onlyPath = process.cwd();

module.exports = {
  sendMail: function (page, headerMail, contentMail) {
    const {to, subject} = headerMail
    contentMail = {
      ...contentMail, 
      base_url: process.env.API_BASE_URL, 
      landing_page: process.env.LANDING_PAGE_URL,
      web_app: process.env.WEB_APP_URL,
      back_office: process.env.BO_URL,
      mobile_app: process.env.BO_URL,
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
  