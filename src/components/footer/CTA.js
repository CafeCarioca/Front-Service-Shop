import React from "react";
import styled from "styled-components";
import CTAform from "./CTAform";
import CTAsocials from "./CTAsocials";
import CTAcontact from "./CTAcontact";

const CTAsection = styled.section`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.white};
`;
const CTAcontainer = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    align-items: start;
  }
`;
const CTA = () => {
  return (
    <CTAsection>
      <CTAcontainer className="centered-section">
        <CTAform />
        <CTAsocials />
        <CTAcontact />
      </CTAcontainer>
    </CTAsection>
  );
};

export default CTA;
