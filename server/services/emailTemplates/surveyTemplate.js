// Emailer Template

const keys = require("../../config/keys");

module.exports = survey => {
  return `
    <html>
      <body>
        <div>
          <h3 style="text-align: center">Your feedback is important to us!</h3>
          <p style="text-align: center">We'd appreciate it you'd answer the following question:</p>
          <h4 style="text-align: center">${survey.body}</h4>
          <div style="text-align: center">
            <a style="margin: 10px" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">YES</a>

            <a style="margin: 10px" href="${keys.redirectDomain}/api/surveys/${survey.id}/no">NO</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
