import React from "react";
import styled from "styled-components";
import { MoreInfoArrow, StyledLinks } from "../../UI";
import { Link } from "react-router-dom";
import {
  formatPrice,
  getDiscountLabel,
  getProductPriceInfo,
} from "../../utils/productPricing";

const SingleCoffee = styled.article`
  text-align: center;
  min-width: 12rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  p {
    font-weight: 600;
    margin-bottom: 0.45rem;
    text-transform: uppercase;
    font-size: 0.85rem;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;

const CoffeeImg = styled.img`
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.white || '#fff'};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageLink = styled(Link)`
  position: relative;
  display: inline-flex;
  width: 240px;
  height: 320px;
  margin-bottom: 1rem;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${({ theme }) => theme.colors.carioca_brickred || '#fc2626'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  letter-spacing: 0.5px;
  pointer-events: none;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 1.55rem;
  margin-bottom: 0.8rem;
  font-family: ${({ theme }) => theme.fonts[3]};
  line-height: 1;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: 0.85rem;
`;

const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.colors.carioca_brickred || '#fc2626'};
  font-size: 1.1rem;
  font-weight: 700;
`;

const RegularPrice = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1rem;
  font-weight: 700;
`;

const FromLabel = styled.span`
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const Coffee = (props) => {
  const priceInfo = getProductPriceInfo(props);
  const discountLabel = getDiscountLabel(props.discount);
  
  return (
    <SingleCoffee>
      <ImageLink to={props.to}>
        {priceInfo.hasDiscount && discountLabel && (
          <DiscountBadge>{discountLabel}</DiscountBadge>
        )}
        <CoffeeImg src={props.listImg} alt={props.blendName} category={props.category} />
      </ImageLink>
      
      <StyledLinks to={props.to} className="linkDarkGrey">
        <p>{props.blendName}</p>
      </StyledLinks>

      {priceInfo.originalPrice !== null && (
        <PriceContainer aria-label={`Precio ${props.blendName}`}>
          {priceInfo.showFromLabel && <FromLabel>Desde</FromLabel>}
          {priceInfo.hasDiscount ? (
            <>
              <OriginalPrice>{formatPrice(priceInfo.originalPrice)}</OriginalPrice>
              <DiscountedPrice>{formatPrice(priceInfo.discountedPrice)}</DiscountedPrice>
            </>
          ) : (
            <RegularPrice>{formatPrice(priceInfo.originalPrice)}</RegularPrice>
          )}
        </PriceContainer>
      )}
      
      <StyledLinks to={props.to}>
        <MoreInfoArrow>Ver mas</MoreInfoArrow>
      </StyledLinks>
    </SingleCoffee>
  );
};

export default Coffee;
