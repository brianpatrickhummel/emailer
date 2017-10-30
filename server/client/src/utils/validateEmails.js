// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmails = emails
    .replace(/,\s*$/, " ") // removes commas for validation
    .split(",")
    .map(email => email.trim())
    .filter(email => !re.test(email));

  if (invalidEmails.length) {
    // Return an ES6 template string (back-ticks)
    return `These emails are invalid: ${invalidEmails}`;
  }
};
