const nodemailer = require("nodemailer");

module.exports = {
  transporter: function (host, user, pass) {
    return nodemailer.createTransport({
      host,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user,
        pass,
      },
      tls: {
        chiffers: "SSLv3",
      },
    });
  },

  mailOptions: function (from, to, subject, html) {
    return { from, to, subject, html };
  },

  sendMail: function (service, from, password, to, subject, html) {
    const transporter = module.exports.transporter(service, from, password);
    const mailOptions = module.exports.mailOptions(from, to, subject, html);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email error: " + error);
      else console.log("Email sent : " + info.response);
    });
  },
};
