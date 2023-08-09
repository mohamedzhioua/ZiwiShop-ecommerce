const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendMail = async (to, url, name, subject, template) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });
    const handlebarsOptions = {
        viewEngine: {
          extname: ".handlebars",
          partialsDir: path.resolve("./views"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views"),
        extName: ".handlebars",
      };
      transporter.use("compile", hbs(handlebarsOptions));

      const mailOptions = {
        from: {
          name: "ZiwiShop",
          address: process.env.SMPT_MAIL,
        },
        to: to,
        subject: subject,
        template: template,
        context: {
          name,
          url,
        },
      };
    
      return await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
