import React, { useEffect } from "react";
import styled from "styled-components";
const AboutUsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightestGray};
  padding: 3rem;
  h1 {
    color: ${({ theme }) => theme.colors.primaryGreen};
    font-size: ${({ theme }) => theme.fontSizes.xbig};
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 2rem;
    line-height: 1.5rem;
    color: ${({ theme }) => theme.colors.mediumGray};
  }
`;

const AboutUsContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;
const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AboutUsSection>
      <AboutUsContainer>
        <h1>ABOUT US</h1>
        <p>
          Two 14 Coffee Company's beginnings are founded in the history of the{" "}
          <b> 2nd/14th Light Horse Regiment</b> (Queensland Mounted Infantry).
          Our Director is a military veteran, who served as an Australian Army
          Officer, beginning his career as an Australian Armoured Corps Officer.
        </p>
        <p>
          The 2nd/14th LHR (QMI) was formed in 1952, though sentimentally traces
          its lineage to 1860. Consequently, there was a claim that it was the
          oldest Australian Regular Army unit through the antecedent units 2nd
          Moreton Light Horse (QMI) and the 14th West Moreton Light Horse (QMI)
          and celebrated its 150th anniversary in 2010.
        </p>
        <p>
          Two 14 Coffee Company continues to honour our heritage and the
          veterans who served Australia in the 2nd/14th Light Horse Regiment by
          adopting the green and white patch colours in our branding as well as
          their motto, 'forward'.
        </p>
        <p>
          We are a proud Australian small business, serving local communities
          and giving back to support Australian military veterans and their
          families.
        </p>
      </AboutUsContainer>
    </AboutUsSection>
  );
};

export default AboutUs;
