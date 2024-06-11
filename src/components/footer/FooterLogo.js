import React from "react";
import styled from "styled-components";
import Logo from "../../UI/Logo/Logo";
const FooterLogoSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  padding: 3.5rem 0;
`;
const FooterLogo = () => {
  return (
    <FooterLogoSection>
      <Logo />
    </FooterLogoSection>
  );
};

export default FooterLogo;
