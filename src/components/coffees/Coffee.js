import React from "react";
import styled from "styled-components";
import { MoreInfoArrow, StyledLinks } from "../../UI";
import { Link } from "react-router-dom";

const SingleCoffee = styled.article`
  text-align: center;
  /* width: 20rem; */
  min-width: 15rem;

  p {
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;

    /* &:hover {
      cursor: pointer;
    } */
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;
const CoffeeImg = styled.img`
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  object-fit: cover;
`;

const Coffee = (props) => {
  return (
    <SingleCoffee>
      <Link to={props.to}>
        <CoffeeImg src={props.listImg} alt={props.blendName} />
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
