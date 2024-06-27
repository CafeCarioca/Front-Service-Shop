import React from "react";
import styled from "styled-components";
import { BsArrowRightShort } from "react-icons/bs";
const InfoArrow = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
  display: flex;
  align-items: center;

  justify-content: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryGreen};
    cursor: pointer;
  }
`;

const MoreInfoArrow = ({ children }) => {
  return (
    <InfoArrow>
      {children}
      <BsArrowRightShort />
    </InfoArrow>
  );
};

export default MoreInfoArrow;
