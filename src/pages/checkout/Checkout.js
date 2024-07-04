import React, { useEffect } from "react";
import styled from "styled-components";

import { CheckoutItem } from "../index";
import { SimpleButton } from "../../UI";

const CheckoutSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightestGray};
  min-height: 90vh;
  padding: 3rem 0;
  display: grid;
  place-items: center;
`;

const CheckoutContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  justify-content: space-between;
  height: 100%;
  align-items: center;
  h1 {
    margin-bottom: 3rem;
    text-align: center;
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    width: 40%;
  }
`;
const CheckoutFooter = styled.div`
  width: 100%;
  text-align: center;
  display: grid;
  place-items: center;
`;
const TotalContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-left: none;
  border-right: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  margin-bottom: 1rem;
  span {
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
    font-weight: 600;
    display: inline-block;
  }
`;

const Checkout = ({ checkoutList }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const itemTotals = checkoutList.reduce(
    (accumulator, currValue) =>
      accumulator + +(currValue.price * currValue.quantity),
    0
  );
  return (
    <CheckoutSection>
      <CheckoutContainer>
        <div>
          <h1>CHECKOUT</h1>
          {checkoutList.length === 0 && <h3>No items in your cart.</h3>}
          {checkoutList.map((item, index) => {
            return <CheckoutItem key={index} {...item}></CheckoutItem>;
          })}
        </div>
        {checkoutList.length > 0 && (
          <CheckoutFooter>
            <TotalContainer>
              <span>SUBTOTAL</span> <span>${itemTotals}.00</span>
            </TotalContainer>
            <SimpleButton
              bg={(props) => props.theme.colors.darkGray}
              color={(props) => props.theme.colors.white}
              type="button"
              width="100%"
            >
              Continue to shipping
            </SimpleButton>
          </CheckoutFooter>
        )}
      </CheckoutContainer>
    </CheckoutSection>
  );
};

export default Checkout;
