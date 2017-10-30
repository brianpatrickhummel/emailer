const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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

    // Generate new instance of SendGrid Mailer and call the send function
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save(); // create new variable since req.user will no longer be current

      res.send(user); // send updated User Model so our Header component renders updated Credits
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Post-survey response landing page
  app.get("/api/surveys/feedback", (req, res) => {
    res.send("Thank you for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    console.log(req.body);

    // Respond to SendGrid request with an empty object
    res.send({});
  });
};
