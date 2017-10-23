const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    // ES6 Destructuring
    // const title = req.body.title;
    // const subject = req.body.subject;
    // const body = req.body.body;
    // const recipients = req.body.recipients;
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      // again, ES6 destructuring
      // with property value shorthand
      // syntax, you can omit the property value if key
      // matches variable name
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Generate new instance of sendgrid Mailer and call the send function
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });

  app.get("api/surveys", (req, res) => {});

  app.post("api/surveys/webhooks", (req, res) => {});
};
