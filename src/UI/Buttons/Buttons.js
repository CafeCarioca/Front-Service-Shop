import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const SharedButtonsCss = css`
  color: ${(props) => (props.disabled ? props.theme.colors.darkGray : props.color)};
  font-size: ${({ theme }) => theme.fontSizes.xmedium};
  font-family: ${({ theme }) => theme.fonts[1]};
  width: ${(props) => props.width || "null"};
  padding: 1rem 2rem;
  background-color: ${(props) => (props.disabled ? props.theme.colors.lightGray : props.bg)};
  border: none;
  border-radius: 0.2rem;
  text-decoration: none;
  display: block;
  text-align: center;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    background-color: ${(props) => !props.disabled && props.theme.colors.mediumGray};
  }
`;

const StyledButtons = styled(Link)`
  ${SharedButtonsCss}
`;

const StyledSimpleButton = styled.button`
  ${SharedButtonsCss}
`;

const Buttons = (props) => {
  return (
    <StyledButtons
      bg={props.bg}
      color={props.color}
      width={props.width}
      to={props.to}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButtons>
  );
};

export const SimpleButton = (props) => {
  return (
    <StyledSimpleButton
      bg={props.bg}
      type={props.type}
      color={props.color}
      width={props.width}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </StyledSimpleButton>
  );
};

export default Buttons;