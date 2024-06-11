import React from "react";
import styled, { css } from "styled-components";
import Buttons from "../../UI/Buttons/Buttons";
import featuredCoffee from "../../assets/images/featuredCoffee.JPG";
import coffeeBlendsData from "../coffees/CoffeeData";

const FeaturedSection = styled.section`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.lightestGray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkerGray};
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    padding: 4rem 0;
  }
`;
const FeaturedContainer = styled.section`
  width: 90%;
  margin: 0 auto;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: flex;
    gap: 3rem;
  }
`;
const SharedLRCss = css`
  max-width: 600px;
  margin: 0 auto;
`;
const FeaturedLeft = styled.section`
  font-family: ${({ theme }) => theme.fonts[1]};
  ${SharedLRCss}
  h2 {
    font-family: ${({ theme }) => theme.fonts[3]};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.darkGray};
    margin: 1.5rem 0 2rem 0;
    @media screen and (min-width: ${({ theme }) =>  theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.xxbig};
    }
  }
  p {
    color: ${({ theme }) => theme.colors.mediumGray};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    line-height: 1.3rem;
    margin-bottom: 5rem;
  }
`;
const FeaturedTag = styled.span`
  font-family: ${({ theme }) => theme.fonts[1]};
  background-color: ${({ theme }) => theme.colors.mediumGray};
  color: ${({ theme }) => theme.colors.lightestGray};
  padding: 0.3rem;
  text-transform: uppercase;
  border-radius: 0.2rem;
`;

const FeaturedRight = styled.section`
  ${SharedLRCss}
`;
const FeaturedImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  margin-top: 3rem;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    margin-top: 0;
  }
`;
const FeaturedBlend = (props) => {
  const { description, singleImg, blendName } = coffeeBlendsData[0];
  return (
    <FeaturedSection>
      <FeaturedContainer>
        <FeaturedLeft>
          <FeaturedTag>featured blend</FeaturedTag>
          <h2>{blendName}</h2>
          <p>
            {description}
            {/* Lightweight and durable, our Two 14 Coffee Co branded Enamel Mug is
            a must-have!
            <br /> Material: Metal with an enamel layer and sublimation coating.
            <br /> Dimensions: height 3.14″ (8 cm), diameter 3.25″ (8.5 cm)
            <br />
            White coating with a silver rim
            <br /> <b> NOT dishwasher or microwave safe</b>
            <br /> Hand-wash only <br />
            <b>Attention!</b> Don't heat liquids or food directly in the mug—it
            can damage the coating. */}
          </p>
          <Buttons
            bg={(props) => props.theme.colors.secondaryGreen}
            width={"100%"}
            color={(props) => props.theme.colors.lightestGray}
            to={`/collections/coffee-blends/${blendName}`}
          >
            View Product
          </Buttons>
        </FeaturedLeft>
        <FeaturedRight>
          <FeaturedImg src={singleImg} alt="Featured coffee" />
        </FeaturedRight>
      </FeaturedContainer>
    </FeaturedSection>
  );
};

export default FeaturedBlend;
