// Emailer Template

const keys = require("../../config/keys");

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="background-color: rgba(1,1,1,0.6); padding: 25px; border: 1px solid white; border-radius: 10px;">
          <h3 style="text-align: center; color: white;font-size:16px;">Your feedback is important to us!</h3>
          <p style="text-align: center; color: white; font-size:14px; margin-bottom: 30px;">If you'd be willing to take a moment and respond to the following question we would greatly appreciate it:</p>
          <h2 style="text-align: center; background-color: black; color: white;border: 1px solid white; padding: 20px;">${survey.body}</h2>
          <div style="text-align: center">
            <button style="margin: 20px">
              <a style="text-decoration: none" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">YES</a>
            </button>
            <button style="margin: 20px; text-decoration: none;">
              <a style="text-decoration: none"  href="${keys.redirectDomain}/api/surveys/${survey.id}/no">NO</a>
            </button>
          </div>
        </div>
      </body>
    </html>
  `;
};
