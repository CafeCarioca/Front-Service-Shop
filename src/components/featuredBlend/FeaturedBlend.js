import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Buttons from "../../UI/Buttons/Buttons";
import { API_ENDPOINTS } from "../../apiConfig";

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
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
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