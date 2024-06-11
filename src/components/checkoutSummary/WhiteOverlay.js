import React from "react";
import styled from "styled-components";
const CheckoutSummaryContainer = styled.article.attrs((props) => ({
  className: props.className,
}))`
  width: 85vw;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};

  position: fixed;
  top: 0;

  z-index: 11;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    width: 35vw;
  }
  &.right {
    right: 0;
  }
  &.left {
    left: 0;
  }
`;
const WhiteOverlay = (props) => {
  return (
    <CheckoutSummaryContainer className={props.className}>
      {props.children}
    </CheckoutSummaryContainer>
  );
};

export default WhiteOverlay;
