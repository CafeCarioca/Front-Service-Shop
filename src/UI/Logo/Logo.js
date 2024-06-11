import React from "react";
import styled, { css } from "styled-components";
import LogoImg from "../../assets/images/logoImage.JPG";

const IntroContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  max-width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    max-width: 100%;
    padding: 0 2rem;
  }
`;
const IntroLeft = styled.div``;
const LogoMainText = styled.h1`
  font-family: ${({ theme }) => theme.fonts[2]};
  font-size: ${({ theme }) => theme.fontSizes.big};
  margin-bottom: 0.5rem;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
    font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
  }
`;
const LogoFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 15rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    max-width: 30rem;
  }
`;
const LogoText = css`
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: 0.5rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    padding: 0.7rem 0.5rem;
  }
`;
const LogoFlexLeft = styled.div`
  ${LogoText}
  border-right: none;
`;
const LogoFlexRight = styled.div`
  ${LogoText}
  border-left: none;
`;
const LogoImgIcon = styled.img`
  width: 20%;
`;
const LogoSubText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondaryGreen};
  margin-top: 1rem;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts[1]};
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
  }
`;

const MainLogo = () => {
  return (
    <>
      <IntroContainer>
        <IntroLeft>
          <LogoMainText>TWO14</LogoMainText>
          <LogoFlex>
            <LogoFlexLeft>COFFEE</LogoFlexLeft>
            <LogoImgIcon src={LogoImg} alt="" />
            <LogoFlexRight>COMPANY</LogoFlexRight>
          </LogoFlex>
          <LogoSubText>Helping veterans move forward</LogoSubText>
        </IntroLeft>
      </IntroContainer>
    </>
  );
};

export default MainLogo;
