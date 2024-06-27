import React from "react";
import styled from "styled-components";
import CoffeeSelection from "./CoffeeSelection";
import { MoreInfoArrow, StyledLinks } from "../../UI";

const CoffeesSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightestGray};
  padding-bottom: 1rem;
`;
const CoffeesContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 3rem 0;
`;
const CoffeesText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  h2 {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
  div {
    @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
      display: none;
    }
  }
`;

const Coffees = () => {
  return (
    <CoffeesSection>
      <CoffeesContainer>
        <CoffeesText>
          <h2>blends de café</h2>
          <div>
            <StyledLinks to="/collections/coffee-blends/">
              <MoreInfoArrow>Ver mas productos</MoreInfoArrow>
            </StyledLinks>
          </div>
        </CoffeesText>
        <CoffeeSelection />
      </CoffeesContainer>
    </CoffeesSection>
  );
};

export default Coffees;
