import React from "react";
import styled from "styled-components";
const CopyrightSection = styled.section`
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem 0 2rem 0;
`;
const CopyrightContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.mediumGray};
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
`;
const CopyrightRight = styled.div`
  text-transform: capitalize;
  display: flex;
  gap: 2rem;
  span {
    &:hover {
      cursor: pointer;
    }
  }
`;
const Copyright = () => {
  return (
    <CopyrightSection>
      <CopyrightContainer className="centered-section">
        <span>&copy; Copyright two 14 coffee co.</span>
        <CopyrightRight>
          <span>privacy</span>
          <span>terms</span>
        </CopyrightRight>
      </CopyrightContainer>
    </CopyrightSection>
  );
};

export default Copyright;
