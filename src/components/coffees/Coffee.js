import React from "react";
import styled from "styled-components";
import { MoreInfoArrow, StyledLinks } from "../../UI";
import { Link } from "react-router-dom";

const SingleCoffee = styled.article`
  text-align: center;
  min-width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;

const CoffeeImg = styled.img`
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: ${props => props.category === 'capsules' ? '15rem' : '15rem'};
  height: ${props => props.category === 'capsules' ? '15rem' : '20rem'};
  object-fit: cover;
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
