import React from "react";
import styled from "styled-components";
import CariocaRed from "../../assets/images/logo-el-carioca-red.png";
const FooterLogoSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.75rem 1.5rem 1.25rem;
  display: flex;
  justify-content: center;
`;

const FooterLogoImage = styled.img`
  display: block;
  width: min(100%, 470px);
  height: auto;
`;

const FooterLogo = () => {
  return (
    <FooterLogoSection>
      <FooterLogoImage src={CariocaRed} alt="El Carioca — la marca del café desde 1916" />
    </FooterLogoSection>
  );
};

export default FooterLogo;
