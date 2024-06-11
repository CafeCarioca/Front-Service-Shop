import React from "react";
import { WhiteOverlay, Backdrop, navData } from "../index";
import { StyledNavLinks } from "../../UI";
import { ImCross } from "react-icons/im";
import styled from "styled-components";

const NavLinksContainer = styled.nav.attrs((props) => ({
  className: props.className,
}))`
  margin-top: 2rem;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &.fontColor {
    color: ${({ theme }) => theme.colors.mediumGray};
  }
`;
const SideNav = (props) => {
  return (
    <>
      <Backdrop onClick={props.closeSideNav} />
      <WhiteOverlay className="left">
        <div>
          <ImCross onClick={props.closeSideNav} />
          <NavLinksContainer>
            {navData.map((item, index) => {
              return (
                <StyledNavLinks
                  key={index}
                  to={item.to}
                  color={(props) => props.theme.colors.mediumGray}
                  onClick={props.closeSideNav}
                >
                  {item.title}
                </StyledNavLinks>
              );
            })}
          </NavLinksContainer>
        </div>
      </WhiteOverlay>
    </>
  );
};

export default SideNav;
