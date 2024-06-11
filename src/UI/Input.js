import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.8rem 1rem;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.mediumGray};
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondaryGreen};
    outline: none;
  }
`;

const Input = (props) => {
  return <StyledInput placeholder={props.placeholder} type={props.type} />;
};

export default Input;
