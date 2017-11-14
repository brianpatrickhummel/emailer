import React, { Component } from "react";
import styled from "styled-components";
import "../index.css";
import { Collapsible, CollapsibleItem } from "react-materialize";
import FontAwesome from "react-fontawesome";

class Landing extends Component {
  render() {
    const Wrapper = styled.div`text-align: center;`;

    const TitleWrapper = styled.div`
      border: 1px solid white;
      margin: 30px 0 20px 0;
    `;

    const Title = styled.h1`
      font-size: 105px;
      font-family: "Prisma";
      letter-spacing: 0.3em;
      text-indent: 0.15em;
      margin-bottom: 2.1rem;
      color: white;

      @media (max-width: 1024px) {
        font-size: 85px;
        letter-spacing: 0.2em;
      }
      @media (max-width: 768px) {
        font-size: 55px;
        letter-spacing: 0.1em;
      }
    `;

    const SubTitle = styled.h6`
      color: white;
      margin-bottom: 20px;
      background-color: #395463;
      padding: 5px;
      border-radius: 25px;
    `;

    const Steps = styled.h4`
      font-size: 65px;
      font-family: "Prisma";
      letter-spacing: 0.3em;
      text-indent: 0.15em;
      color: white;
      margin-bottom: 20px;

      @media (max-width: 1024px) {
        font-size: 55px;
        letter-spacing: 0.2em;
      }
      @media (max-width: 768px) {
        font-size: 45px;
        letter-spacing: 0.1em;
      }
    `;

    return (
      <Wrapper>
        <TitleWrapper>
          <Title>EMAILER</Title>
        </TitleWrapper>
        <SubTitle>expedient creation, dispatch and tracking of simple binary customer feedback surveys</SubTitle>
        <Steps>4 STEPS:</Steps>
        <div>
          <Collapsible popout accordion>
            <CollapsibleItem header="purchase credits" icon="credit_card">
              One emailer campaign can be launched for price of one credit. <br />Credits are purchased five at a time.
              $5 to play!
              <br />
              <FontAwesome name="cc-stripe" size="2x" />
              <br />
              Checkout managed by Stripe, the industry standard for eCommerce credit card transactions. Emailer neither
              stores nor has access to any of the transaction details.
            </CollapsibleItem>
            <CollapsibleItem header="compose survey" icon="content_paste">
              title your survey and provide a subject line for the email. <br />compose a single, meaningful question,
              to which a recipient can provide a binary - Yes or No - answer.
            </CollapsibleItem>
            <CollapsibleItem header="email to recipients" icon="cloud_upload">
              enter a comma-separated list of the recipient email addresses.
            </CollapsibleItem>
            <CollapsibleItem header="evaluate responses" icon="poll">
              send the survey and await feedback. <br />each emailer campaign's response tally can be monitored in your
              user dashboard.
            </CollapsibleItem>
          </Collapsible>
        </div>
      </Wrapper>
    );
  }
}

export default Landing;
