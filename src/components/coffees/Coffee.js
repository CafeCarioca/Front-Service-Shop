import React from "react";
import styled from "styled-components";
import { MoreInfoArrow, StyledLinks } from "../../UI";
import { Link } from "react-router-dom";

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
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    font-size: 0.85rem;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;

const CoffeeImg = styled.img`
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 240px;
  height: 320px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.white || '#fff'};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
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
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 0.85rem;
`;

const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.colors.carioca_brickred || '#fc2626'};
  font-size: 1.1rem;
  font-weight: 700;
`;

const Coffee = (props) => {
  const { has_discount, discount, discounted_price, price, original_price } = props;
  
  return (
    <SingleCoffee>
      {has_discount && discount && (
        <DiscountBadge>OFERTA</DiscountBadge>
      )}
      
      <Link to={props.to}>
        <CoffeeImg src={props.listImg} alt={props.blendName} category={props.category} />
      </Link>
      
      <StyledLinks to={props.to} className="linkDarkGrey">
        <p>{props.blendName}</p>
      </StyledLinks>
      
      <StyledLinks to={props.to}>
        <MoreInfoArrow>Ver mas</MoreInfoArrow>
      </StyledLinks>
    </SingleCoffee>
  );
};

export default Coffee;
