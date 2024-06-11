import React from "react";
import styled from "styled-components";
import footerLinksData from "./footerLinksData";
import { StyledLinks } from "../../UI/index";

const FooterLinksSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 5rem 0;
`;
const FooterLinksContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 0;
  }
`;
const FooterList = styled.div`
  h3 {
    text-transform: uppercase;
    margin-bottom: 2rem;
    font-family: ${({ theme }) => theme.fonts[0]};
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
    color: ${({ theme }) => theme.colors.mediumGray};
  }
  li {
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    font-family: ${({ theme }) => theme.fonts[1]};
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.darkerGray};
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.mediumGray};
    }
  }
`;

const FooterLinks = () => {
  return (
    <FooterLinksSection>
      <FooterLinksContainer>
        {footerLinksData.map((link, index) => {
          const { title, linkList } = link;
          return (
            <FooterList key={index}>
              <h3>{title}</h3>

              <ul key={index}>
                {linkList.map((listItem, itemIndex) => {
                  const { item, to } = listItem;
                  return (
                    <li key={itemIndex}>
                      <StyledLinks to={to} className="linkDarkerGray">
                        {item}
                      </StyledLinks>
                    </li>
                  );
                })}
              </ul>
            </FooterList>
          );
        })}
      </FooterLinksContainer>
    </FooterLinksSection>
  );
};

export default FooterLinks;
