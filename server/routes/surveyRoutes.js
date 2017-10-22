const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("api/surveys", requireLogin, (req, res) => {});

  app.get("api/surveys", (req, res) => {});

  app.post("api/surveys/webhooks", (req, res) => {});
};
