import React from "react";
import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import GoogleReviews from "./GoogleReviews";
import TrustmaryWidget from "./TrustmaryWidget";
import CTA from "./CTA";
import Copyright from "./Copyright";
const Footer = () => {
  return (
    <>
      <TrustmaryWidget />
      <CTA />
      <Copyright />
    </>
  );
};

export default Footer;
