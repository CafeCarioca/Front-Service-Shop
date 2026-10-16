import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Buttons from "../../UI/Buttons/Buttons";
import { API_ENDPOINTS } from "../../apiConfig";
import { optimized, optimizedSrcSet, fallbackToOriginal } from "../../utils/imageUrl";
import { getProductPriceInfo, getDiscountLabel, formatPrice } from "../../utils/productPricing";

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

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
`;

const OfferBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts[1]};
  background-color: ${({ theme }) => theme.colors.carioca_brickred || "#c0392b"};
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  animation: carioca-offer-pulse 1.8s ease-in-out infinite;

  @keyframes carioca-offer-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: -1.5rem 0 2.5rem 0;
  font-family: ${({ theme }) => theme.fonts[3]};
`;

const FromLabel = styled.span`
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: 1.1rem;
`;

const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.colors.carioca_brickred || "#c0392b"};
  font-size: 1.9rem;
  font-weight: 700;
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
`;

const ImageOfferRibbon = styled.div`
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  background-color: ${({ theme }) => theme.colors.carioca_brickred || "#c0392b"};
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  z-index: 10;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  pointer-events: none;
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
  const priceInfo = getProductPriceInfo(product);
  const discountLabel = getDiscountLabel(product.discount);
  const showOffer = priceInfo.hasDiscount && Boolean(discountLabel);

  return (
    <FeaturedSection>
      <FeaturedContainer>
        <FeaturedLeft>
          <TagRow>
            <FeaturedTag>Blend destacado</FeaturedTag>
            {showOffer && <OfferBadge>Oferta {discountLabel}</OfferBadge>}
          </TagRow>
          <h2>{name}</h2>
          <p>{description}</p>
          {showOffer && priceInfo.showPriceDiscount && priceInfo.originalPrice !== null && (
            <PriceRow>
              {priceInfo.showFromLabel && <FromLabel>Desde</FromLabel>}
              <OriginalPrice>{formatPrice(priceInfo.originalPrice)}</OriginalPrice>
              <DiscountedPrice>{formatPrice(priceInfo.discountedPrice)}</DiscountedPrice>
            </PriceRow>
          )}
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
          <ImageWrap>
            {showOffer && <ImageOfferRibbon>{discountLabel}</ImageOfferRibbon>}
            <FeaturedImg
              src={optimized(secondary_image_url, 800)}
              srcSet={optimizedSrcSet(secondary_image_url, 800)}
              onError={fallbackToOriginal(secondary_image_url)}
              loading="lazy"
              decoding="async"
              alt={`Blend destacado ${name}`}
            />
          </ImageWrap>
        </FeaturedRight>
      </FeaturedContainer>
    </FeaturedSection>
  );
};

export default FeaturedBlend;