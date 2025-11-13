import React from "react";
import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const HeaderSection = styled.section`
  background-color: ${({ theme }) => theme.colors.carioca_brickred};
`;

const HeaderContainer = styled.header`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts[1]};
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  overflow: hidden;
  white-space: nowrap;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
  }
`;

const RotatingText = styled.div`
  display: inline-block;
  animation: ${rotate} 10s linear infinite;
`;

const Header = (props) => {
  return (
    <HeaderSection>
      <HeaderContainer>
        {/* <RotatingText>
          Envio gratis en pedidos superiores a $1000 | Entregas en 24/48 horas | 
        </RotatingText> */}
      </HeaderContainer>
    </HeaderSection>
  );
};

export default Header;