// Survey/Emailer Creation Middleware - Check for adequate credits

module.exports = (req, res, next) => {
  // if Passport has not assigned a User Model to req, send a Forbidden Status
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits!" });
  }

  next();
};
