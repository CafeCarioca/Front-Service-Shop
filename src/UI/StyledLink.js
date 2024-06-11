import React from "react";
import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";
const sharedLinkStyles = css`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const StyledLink = styled(Link)`
  ${sharedLinkStyles}
`;
const StyledNavLink = styled(NavLink)`
  ${sharedLinkStyles}
  color: ${(props) =>
    props.color
      ? (props) => props.color
      : (props) => props.theme.colors.lightGray};
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      cursor: pointer;
    }
  }
`;

const StyledLinks = ({ children, to, className }) => {
  return (
    <StyledLink to={to} className={className}>
      {children}
    </StyledLink>
  );
};
export const StyledNavLinks = ({ children, to, className, color, onClick }) => {
  return (
    <StyledNavLink
      to={to}
      className={className}
      color={color}
      onClick={onClick}
    >
      {children}
    </StyledNavLink>
  );
};

export default StyledLinks;
