import React from "react";
import CTAcard from "./CTAcard";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import styled from "styled-components";

const SocialLinks = styled.div`
  a {
    color: ${({ theme }) => theme.colors.white};
  }
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-top: 1rem;
  display: flex;
  gap: 2rem;
`;
const CTAsocials = (props) => {
  return (
    <CTAcard
      bg={(props) => props.theme.colors.primaryGreen}
      colorH3={(props) => props.theme.colors.lightestGray}
      color={(props) => props.theme.colors.lightGray}
    >
      <h3>follow us</h3>
      <p>
        You know the drill. Show your support by following and sharing our
        message on social media.
      </p>
      <SocialLinks>
        <a
          href="https://www.instagram.com/two14coffeeco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@two14coffeeco"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiTiktok />
        </a>
        <a
          href="https://www.facebook.com/Two14CoffeeCo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare />
        </a>
      </SocialLinks>
    </CTAcard>
  );
};

export default CTAsocials;
