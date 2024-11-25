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
}) => {
  return (
    <CheckoutItemContainer>
      <CheckoutImgContainer>
        <CheckoutItemImage src={singleImg} alt={blendName} />
        <span>{quantity}</span>
      </CheckoutImgContainer>
      <CheckoutDetails>
        <BlendName>{blendName}</BlendName>
        <Details>
          <span>{grams === 1000 ? "1kg" : grams + "g"} </span>/ {grind}
        </Details>
      </CheckoutDetails>
      <Price>${price * quantity}</Price>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
