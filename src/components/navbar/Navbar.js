import React from "react";
import styled, { css } from "styled-components";

import { StyledNavLinks } from "../../UI";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { navData } from "../index";
import CariocaWhite from "../../assets/images/logo-el-carioca-navbar-v2.png";
// import SearchBar from "../searchBar/SearchBar"; // DISABLED - Search feature
const Nav = styled.section`
  position: sticky;
  top: 0;
  z-index: 10;
`;
const NavbarSection = styled.nav`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  padding: 0.7rem 0;
  height: 70px; /* <- ajustá según el diseño */
  display: flex;
  align-items: center;
`;
const NavContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;

  font-size: ${({ theme }) => theme.fontSizes.xxmedium};
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    grid-template-columns: auto 1fr auto;
  }
`;
const SharedNavStyles = css`
  display: flex;
`;
const NavLeft = styled.div`
display: flex;
  align-items: center; /* Alinea verticalmente */
  gap: 1rem;`;
const NavLLeft = styled.div`
  ${SharedNavStyles}
  gap: 1.5rem;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: none;
  }
  
`;
const NavLRight = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: block;
  }

  &:hover {
    cursor: pointer;
  }
`;
const NavCenter = styled.div`
  ${SharedNavStyles}
  align-items: center;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    justify-content: flex-start;
  }
`;
const NavCLeft = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: none;
  }
 
`;
const NavList = styled.ul`
  display: none;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  text-transform: capitalize;
  margin-left: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    ${SharedNavStyles}
    gap: 1.7rem;
  }
`;

const NavRight = styled.div`
  ${SharedNavStyles}
  gap: 1rem;
  justify-self: flex-end;
  align-self: center;
`;
const NavRLeft = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    ${SharedNavStyles}
    gap: 1.5rem;
  }
`;
const NavRRight = styled.div`
  ${SharedNavStyles}
  gap: 0.25rem;
  align-items: center;
`;
// Área táctil mínima de 44px para íconos (menú, carrito, cerrar)
const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  min-width: 44px;
  min-height: 44px;
  display: inline-grid;
  place-items: center;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
`;

const CartNum = styled.div`
  background-color: ${({ theme }) => theme.colors.carioca_brickred};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  border-radius: 0.2rem;
  padding: 0.35rem 0.5rem;
  display: grid;
  place-content: center;
  &:hover {
    cursor: pointer;
  }
`;
const NavRLSearch = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: block;
  }
`;




const LogoImgIcon = styled.img`
  display: block;
  max-height: 43px;
  max-width: 185px;
  width: auto;
  object-fit: contain;
  cursor: pointer;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    max-height: 46px;
    max-width: 210px;
  }
`;
const Navbar = ({ openCheckoutSummary, checkoutList, openSideNav }) => {
  return (
    <Nav>
      <NavbarSection>
        <NavContainer>
          <NavLeft>
            <NavLLeft>
              <IconButton type="button" aria-label="Abrir menú" onClick={openSideNav}>
                <GiHamburgerMenu className="hoverPointer" color="white"/>
              </IconButton>
            </NavLLeft>
            <NavLRight>
              <LogoImgIcon src={CariocaWhite} alt="El Carioca, desde 1916" onClick={() => window.location.href = '/'} />
            </NavLRight>
          </NavLeft>
          <NavCenter>
            <NavCLeft>
              <LogoImgIcon src={CariocaWhite} alt="El Carioca, desde 1916" onClick={() => window.location.href = '/'} />  
            </NavCLeft>

            <NavList>
              {navData.map((navItem, index) => {
                const { to, title } = navItem;
                return (
                  <li key={index}>
                    <StyledNavLinks to={to} style={{ color: 'white' }}>{title}</StyledNavLinks>
                  </li>
                );
              })}
            </NavList>
          </NavCenter>
          <NavRight>
            <NavRLeft>
              {/* <SearchBar /> */} {/* DISABLED - Search feature */}
            </NavRLeft>
            <NavRRight>
              <IconButton type="button" aria-label="Ver carrito" onClick={openCheckoutSummary}>
                <HiOutlineShoppingCart className="hoverPointerGrey" color="white" />
              </IconButton>
              <CartNum onClick={openCheckoutSummary}>
                {checkoutList.length}
              </CartNum>
            </NavRRight>
          </NavRight>
        </NavContainer>
      </NavbarSection>
    </Nav>
  );
};

export default Navbar;
