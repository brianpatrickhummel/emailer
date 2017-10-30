// Object to hold our survey field values to be rendered by components via map()

export default [
  {
    label: "Survey Title",
    name: "title",
    noValueError: "You must give this survey a title"
  },
  {
    label: "Subject Line",
    name: "subject",
    noValueError: "You must provide text for email subject"
  },
  {
    label: "Email Body",
    name: "body",
    noValueError: "You must provide text for email body"
  },
  {
    label: "Recipient List",
    name: "recipients",
    noValueError: "You must provide recipient email addresses"
  }
];
