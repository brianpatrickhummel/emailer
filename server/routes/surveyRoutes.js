// Survey & Emailer Creation Routes

const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  // Save new Survey to MongoDB and forward to SendGrid to send emails
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

  // Managing Survey Feedback Data from SendGrid Webhook
  app.post("/api/surveys/webhooks", (req, res) => {
    // =============== PREPROCESSING ===============
    // Define path pattern to test against
    const p = new Path("/api/surveys/:surveyId/:choice");
    // Implement lodash chain helper for pre-processing of survey response data
    _.chain(req.body)
      // For each event object in SendGrid array
      .map(({ email, url }) => {
        // Extract pathname from the full URL
        // Compare pattern and pathname
        // If a match, returns an object with path placeholder values
        // If not a match, returns null
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // lodash helper returns array with falsey values removed
      .compact()
      // lodash helper returns array without duplicate elements (identical email & surveyId)
      .uniqBy("email", "surveyId")
      // for each element in event, exeute the following query to MongoDB
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            // Identiry recomrd w surveyId, email and a false value for responded
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      // Return the _.chain end value
      .value();

    // Send response to SendGrid
    res.send({});
  });

  // SendGrid Redirect post-submission survey feedback (handles both Yes & No responses)
  app.get("/api/surveys/:surveyid/:response", (req, res) => {
    res.send("Thank you for your feedback!");
  });
};
