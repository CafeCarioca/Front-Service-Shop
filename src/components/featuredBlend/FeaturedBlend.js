import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Buttons from "../../UI/Buttons/Buttons";
import { API_ENDPOINTS } from "../../apiConfig";

const FeaturedSection = styled.section`
  padding: 3rem 0;
  background-color: ${({ theme }) => theme.colors.lightestGray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkerGray};
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    padding: 5rem 0;
  }
`;

const FeaturedContainer = styled.section`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: flex;
    gap: 4rem;
    align-items: center;
  }
`;

const SharedLRCss = css`
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturedLeft = styled.section`
  font-family: ${({ theme }) => theme.fonts[1]};
  ${SharedLRCss}
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    flex: 1;
  }
  h2 {
    font-family: ${({ theme }) => theme.fonts[3]};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.darkGray};
    margin: 1.5rem 0 1.5rem 0;
    line-height: 1.2;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
      font-size: ${({ theme }) => theme.fontSizes.big};
    }
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.xxbig};
    }
  }
  p {
    color: ${({ theme }) => theme.colors.mediumGray};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    line-height: 1.6rem;
    margin-bottom: 3rem;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
      line-height: 1.8rem;
      margin-bottom: 3.5rem;
    }
  }
`;

const FeaturedTag = styled.span`
  font-family: ${({ theme }) => theme.fonts[1]};
  background-color: ${({ theme }) => theme.colors.mediumGray};
  color: ${({ theme }) => theme.colors.lightestGray};
  padding: 0.4rem 0.8rem;
  text-transform: uppercase;
  border-radius: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: inline-block;
`;

const FeaturedRight = styled.section`
  ${SharedLRCss}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    margin-top: 0;
    flex: 1;
  }
`;

const FeaturedImg = styled.img`
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 350px;
  border-radius: 0.8rem;
  transition: all 0.4s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    height: 380px;
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    height: 420px;
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
    height: 450px;
  }
`;

const FeaturedBlend = (props) => {
  const dayOfWeek = new Date().getDay();
  const id = dayOfWeek >= 1 && dayOfWeek <= 5 ? dayOfWeek : 4; // Default to 1 if not Monday-Friday
  const apiUrl = `${API_ENDPOINTS.GET_PRODUCT}/${id}`;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching the product data:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { description, secondary_image_url, name } = product;

  return (
    <FeaturedSection>
      <FeaturedContainer>
        <FeaturedLeft>
          <FeaturedTag>Blend destacado</FeaturedTag>
          <h2>{name}</h2>
          <p>{description}</p>
          <Buttons
            bg={(props) => props.theme.colors.darkGray}
            width={"100%"}
            color={(props) => props.theme.colors.lightestGray}
            to={`/collections/coffee-blends/${name}`}
          >
            Ver Producto
          </Buttons>
        </FeaturedLeft>
        <FeaturedRight>
          <FeaturedImg src={secondary_image_url} alt="Featured coffee" />
        </FeaturedRight>
      </FeaturedContainer>
    </FeaturedSection>
  );
};

export default FeaturedBlend;