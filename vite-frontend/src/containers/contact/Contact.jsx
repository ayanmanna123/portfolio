import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Contact.css";
import email from "../../assets/svg/email.svg";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const { isDark } = useContext(StyleContext);
  return (
    <div className="main">
      <Fade bottom duration={1000} distance="20px">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="heading contact-title">{contactInfo.title}</h1>
            <p className={isDark ? "dark-mode contact-subtitle" : "contact-subtitle"}>
              {contactInfo.subtitle}
            </p>
          </div>
          <div className="contact-content">
            <div className="contact-main-div">
              <div className="contact-header-phone-div">
                <a className="contact-detail" href={`tel:${contactInfo.number}`}>
                  <span>Call me at </span>
                  <span className="contact-subdetail"> {contactInfo.number}</span>
                </a>
                <br />
                <a className="contact-detail" href={`mailto:${contactInfo.email_address}`}>
                  <span>Or email me at </span>
                  <span className="contact-subdetail"> {contactInfo.email_address}</span>
                </a>
              </div>
              <div className="contact-social">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}