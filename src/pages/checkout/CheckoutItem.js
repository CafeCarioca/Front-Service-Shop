import React from "react";
import styled from "styled-components";

const CheckoutItemContainer = styled.div`
  display: grid;
  grid-template-columns: 5rem auto 5rem;
  width: 100%;
  gap: 1rem;
`;
const CheckoutImgContainer = styled.div`
  position: relative;
  span {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background-color: ${({ theme }) => theme.colors.mediumGray};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    display: grid;
    width: 1.5rem;
    height: 1.5rem;
    place-items: center;
  }
`;
const CheckoutItemImage = styled.img`
  width: 5rem;
  height: auto;
  border-radius: 0.25rem;
`;
const CheckoutDetails = styled.div`
  justify-self: flex-start;
`;
const BlendName = styled.p`
  font-weight: 600;
  margin-bottom: 0.3rem;
`;
const Price = styled.p`
  font-weight: 600;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 0.75rem;
`;

const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.colors.carioca_brickred || '#fc2626'};
  font-weight: 700;
`;

const DiscountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.carioca_brickred || '#fc2626'};
  color: white;
  padding: 0.15rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.65rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const Details = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

const CheckoutItem = ({
  blendName,
  singleImg,
  price,
  grind,
  grams,
  quantity,
  hasDiscount,
  originalPrice,
  discount
}) => {
  const itemTotal = price * quantity;
  const itemOriginalTotal = (originalPrice || price) * quantity;
  
  return (
    <CheckoutItemContainer>
      <CheckoutImgContainer>
        <CheckoutItemImage src={singleImg} alt={blendName} />
        <span>{quantity}</span>
      </CheckoutImgContainer>
      <CheckoutDetails>
        <BlendName>{blendName}</BlendName>
        {hasDiscount && discount && (
          <DiscountBadge>
            {discount.type === 'percentage' 
              ? `-${discount.value}%` 
              : `-$${discount.value}`}
          </DiscountBadge>
        )}
        <Details>
          {grams && grams !== 'null' && (
            <span>{grams === 1000 ? "1kg" : grams + "g"}</span>
          )}
          {grams && grams !== 'null' && grind && grind !== 'null' && ' / '}
          {grind && grind !== 'null' && grind}
        </Details>
      </CheckoutDetails>
      {hasDiscount && originalPrice ? (
        <PriceContainer>
          <OriginalPrice>${itemOriginalTotal.toFixed(0)}</OriginalPrice>
          <DiscountedPrice>${itemTotal.toFixed(0)}</DiscountedPrice>
        </PriceContainer>
      ) : (
        <Price>${itemTotal.toFixed(0)}</Price>
      )}
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
