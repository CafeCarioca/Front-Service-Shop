import React from "react";
import styled from "styled-components";
import desertCars from "../../../assets/images/veterans.JPG";
import Buttons from "../../../UI/Buttons/Buttons";
const VetsSection = styled.section`
  background: linear-gradient(#00000081, #00000081), url(${desertCars});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 3.5rem 0;
`;
const VetsContainer = styled.section`
  margin: 0 auto;
  width: 90%;
`;
const VetsBanner = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    align-items: center;
  }
  h2 {
    color: ${({ theme }) => theme.colors.lightestGray};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: 700;
    @media screen and (min-width: ${({ theme }) =>
        theme.mediaScreen.lgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.xlarge};
      width: 80%;
      text-align: center;
    }
  }
  p {
    font-family: ${({ theme }) => theme.fonts[1]};
    color: ${({ theme }) => theme.colors.lightGray};
    line-height: 1.5rem;
    align-self: flex-start;

    @media screen and (min-width: ${({ theme }) =>
        theme.mediaScreen.laptop768}) {
      font-size: ${({ theme }) => theme.fontSizes.xmedium};
    }
    @media screen and (min-width: ${({ theme }) =>
        theme.mediaScreen.lgLaptop}) {
      width: 90%;
      align-self: center;
      text-align: center;
    }
  }
`;

const HelpingVets = (props) => {
  return (
    <VetsSection>
      <VetsContainer>
        <VetsBanner>
          <h2>Helping veterans move forward</h2>
          <p>
            Two 14 Coffee Company's beginnings are founded in the history of the
            2nd/14th Light Horse Regiment (Queensland Mounted Infantry). We are
            a proud Australian small business, serving local communities and
            giving back to support Australian military veterans and their
            families.
          </p>
          <Buttons
            to="about-us"
            bg={(props) => props.theme.colors.lightestGray}
            color={(props) => props.theme.colors.darkGray}
          >
            Read our story
          </Buttons>
        </VetsBanner>
      </VetsContainer>
    </VetsSection>
  );
};

export default HelpingVets;
