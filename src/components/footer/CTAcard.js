import React from "react";
import styled from "styled-components";

const StyledCTACard = styled.article`
  background: ${(props) => props.bg};
  padding: 2rem 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  h3 {
    color: ${(props) => props.colorH3};
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts[0]};
    margin-bottom: 1rem;
  }
  p {
    font-family: ${({ theme }) => theme.fonts[1]};
    color: ${(props) => props.color};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    line-height: 1.2rem;
  }
`;
const CTAcard = (props) => {
  return (
    <StyledCTACard bg={props.bg} colorH3={props.colorH3} color={props.color}>
      {props.children}
    </StyledCTACard>
  );
};

export default CTAcard;
