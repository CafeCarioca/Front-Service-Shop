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
  gap: 0.25rem;

  a {
    display: block;
    padding: 0.7rem 0;
  }

  &.fontColor {
    color: ${({ theme }) => theme.colors.mediumGray};
  }
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: -0.75rem 0 0 -0.75rem;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  color: inherit;
  cursor: pointer;
`;

const SideNav = (props) => {
  return (
    <>
      <Backdrop onClick={props.closeSideNav} />
      <WhiteOverlay className="left">
        <div>
          <CloseButton type="button" aria-label="Cerrar menú" onClick={props.closeSideNav}>
            <ImCross />
          </CloseButton>
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
