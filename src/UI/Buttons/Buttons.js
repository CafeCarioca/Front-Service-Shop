import React from "react";
import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

const SharedButtonsCss = css`
  color: ${(props) => props.color};
  font-size: ${({ theme }) => theme.fontSizes.xmedium};
  font-family: ${({ theme }) => theme.fonts[1]};
  width: ${(props) => props.width || "null"};
  padding: 1rem 2rem;
  background-color: ${(props) => props.bg};
  border: none;
  border-radius: 0.2rem;
  text-decoration: none;
  display: block;
  text-align: center;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const StyledButtons = styled(Link)`
  ${SharedButtonsCss}
  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumGray};
    cursor: pointer;
  }
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
    >
      {props.children}
    </StyledSimpleButton>
  );
};

export default Buttons;
