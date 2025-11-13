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
  width: ${props => props.category === 'capsules' ? '12rem' : '100%'};
  max-width: 12rem;
  height: ${props => props.category === 'capsules' ? '12rem' : '16rem'};
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.white || '#fff'};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Coffee = (props) => {
  return (
    <SingleCoffee>
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
