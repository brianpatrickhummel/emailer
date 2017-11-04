# EMAILER

Full-stack application that allows for the creation, dispatch and tracking of simple, binary customer feedback survey email campaigns.

## SERVER-SIDE
Node Server with Express API.  Authentication via Google OAuth, PassportJS and the cookie-session library. MongoDB database with a Mongoose ORM, hosted on mLab.  Credit card payments via Stripe API. Email dispatch via SendGrid API.

## CLIENT-SIDE
React using Redux State management, redux-form for the Redux Store linked input form and additional utilities provided by redux-thunk, react-redux, react-router-dom, withRouter, lodash and axios libraries. Styling using the MaterializeCSS, react-materialize, styled-components and react-fontawesome libraries. Payment checkout modal via Stripe and the react-stripe-checkout library. LocalTunnel library to handle SendGrid webhooks for the dev environment,  

Deployed to Heroku. 