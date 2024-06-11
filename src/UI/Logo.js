import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const SharedLogoCss = css`
  display: flex;
  align-items: center;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const LogoContainer = styled(Link)`
  ${SharedLogoCss}
`;
const LogoGreenContainer = styled(Link)`
  ${SharedLogoCss}
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;
const LeftLogoSpan = styled.div`
  font-family: ${({ theme }) => theme.fonts[2]};
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
`;
const RightLogoSpan = styled.div`
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.xxsmall};
  color: ${({ theme }) => theme.colors.secondaryGreen};
  font-weight: 900;
  border: 2px solid ${({ theme }) => theme.colors.secondaryGreen};
  padding: 0.2rem 0.7rem;
`;
const Logo = () => {
  return (
    <LogoContainer to="/">
      <LeftLogoSpan>TWO14</LeftLogoSpan>
      <RightLogoSpan>COFFEE CO.</RightLogoSpan>
    </LogoContainer>
  );
};
export const LogoGreen = () => {
  return (
    <LogoGreenContainer to="/">
      <LeftLogoSpan>TWO14</LeftLogoSpan>
      <RightLogoSpan>COFFEE CO.</RightLogoSpan>
    </LogoGreenContainer>
  );
};

export default Logo;
