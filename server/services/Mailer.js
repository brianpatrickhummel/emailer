// SendGrid Logic

const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    // Calls the constructor of the parent class helper.Mail
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@emailer.com"); // helper from sendgrid library
    this.subject = subject;
    this.body = new helper.Content("text/html", content); // helper from sendgrid library
    this.recipients = this.formatAddresses(recipients); // helper that we created to handle the recipients array of objects

    this.addContent(this.body); // method from helper.Mail Class
    this.addClickTracking(); // helper that we created
    this.addRecipients(); // helper that we created to load recipients into sendgrid
  }

  formatAddresses(recipients) {
    // ES6 destructuring to pull email off of each object in the array {email: email}
    // destructuring with arrow func requires parens around object
    return recipients.map(({ email }) => {
      return new helper.Email(email); // helper from sendgrid library
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
