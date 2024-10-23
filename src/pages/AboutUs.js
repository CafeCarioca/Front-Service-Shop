import React, { useEffect } from "react";
import styled from "styled-components";
const AboutUsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightestGray};
  padding: 3rem;
  h1 {
    color: ${({ theme }) => theme.colors.darkGray};
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
        <h1>Nosotros</h1>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ultricies purus. Donec euismod, nunc id scelerisque ultricies, nunc
          ligula ultricies purus, in scelerisque justo libero at elit. Nullam
          sit amet justo nec purus ultricies ultrices. Nullam sit amet justo nec
        </p>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ultricies purus. Donec euismod, nunc id scelerisque ultricies, nunc
          ligula ultricies purus, in scelerisque justo libero at elit. Nullam
          sit amet justo nec purus ultricies ultrices. Nullam sit amet justo nec
        </p>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ultricies purus. Donec euismod, nunc id scelerisque ultricies, nunc
          ligula ultricies purus, in scelerisque justo libero at elit. Nullam
          sit amet justo nec purus ultricies ultrices. Nullam sit amet justo nec
        </p>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ultricies purus. Donec euismod, nunc id scelerisque ultricies, nunc
          ligula ultricies purus, in scelerisque justo libero at elit. Nullam
          sit amet justo nec purus ultricies ultrices. Nullam sit amet justo nec
        </p>
      </AboutUsContainer>
    </AboutUsSection>
  );
};

export default AboutUs;
