import React, { useState } from "react";
import styled from "styled-components";

const StyledProductButton = styled.button.attrs((props) => ({
  className: props.className,
}))`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: 0.3rem 0.7rem;
  border: 1.2px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 1rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  margin: 0 1rem 1rem 0;
  &:hover {
    border: 1.2px solid ${({ theme }) => theme.colors.mediumGray};
  }
  &.clicked {
    background-color: ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SingleProductButtons = (props) => {
  return (
    <StyledProductButton
      type="button"
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </StyledProductButton>
  );
};

export default SingleProductButtons;
