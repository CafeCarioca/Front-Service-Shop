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
      bg={(props) => props.theme.colors.darkGray}
      colorH3={(props) => props.theme.colors.lightestGray}
      color={(props) => props.theme.colors.lightGray}
    >
      <h3>Síguenos</h3>
      <p>
        Síguenos en nuestras redes sociales y ayudanos a difundir nuestra pasión por el café.
      </p>
      <SocialLinks>
        <a
          href="https://www.instagram.com/cafeelcarioca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@cafecarioca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiTiktok />
        </a>
        <a
          href="https://www.facebook.com/cafeelcarioca"
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
