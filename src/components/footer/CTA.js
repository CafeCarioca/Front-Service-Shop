import React from "react";
import styled from "styled-components";
import CTAform from "./CTAform";
import CTAsocials from "./CTAsocials";
import CTAcard from "./CTAcard";

const CTAsection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;
const CTAcontainer = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;
const CTA = () => {
  return (
    <CTAsection>
      <CTAcontainer className="centered-section">
        <CTAform />
        <CTAsocials />
      </CTAcontainer>
    </CTAsection>
  );
};

export default CTA;
