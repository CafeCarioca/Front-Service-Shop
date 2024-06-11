import React from "react";
import styled, { css } from "styled-components";

const HeaderSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primaryGreen};
`;
const HeaderContainer = styled.header`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts[1]};
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.white};
  width: 90%;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

// const HeaderSelect = styled.select`
//   background-color: black;
//   color: white;
//   padding: 0.2rem;
//   border-radius: 0.5rem;
//   border: none;
//   display: none;
//   justify-self: flex-start;
//   font-family: ${({ theme }) => theme.fonts[1]};
//   @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
//     display: block;
//   }
// `;

const HeaderRight = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: flex;
    gap: 1rem;
    justify-self: flex-end;
  }
`;
const DivSpan = styled.div`
  color: ${({ theme }) => theme.colors.lightGray};
`;
const Header = (props) => {
  return (
    <HeaderSection>
      <HeaderContainer>
        {/* <HeaderSelect name="currency" id="currency">
          <option value="rands">ZAR R</option>
          <option value="usDollars">USD $</option>
        </HeaderSelect> */}
        <div>
          <p>Free Shipping on orders over $80</p>
        </div>
        {/* <HeaderRight>
          <span>Create an account</span>
          <DivSpan>|</DivSpan>
          <span>Sign in</span>
        </HeaderRight> */}
      </HeaderContainer>
    </HeaderSection>
  );
};

export default Header;
