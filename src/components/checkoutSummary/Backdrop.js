import React from "react";
import styled from "styled-components";
const CheckoutSummaryBackdrop = styled.section`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #c2bfbf78;
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Backdrop = (props) => {
  return (
    <CheckoutSummaryBackdrop onClick={props.onClick}></CheckoutSummaryBackdrop>
  );
};

export default Backdrop;
