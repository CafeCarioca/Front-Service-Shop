import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Coffee from "../coffees/Coffee";
import { MoreInfoArrow, StyledLinks } from "../../UI";
import { API_ENDPOINTS } from "../../apiConfig";

// Bloque "También en cápsulas" del Home: muestra que vendemos cápsulas desde
// la primera pantalla (antes solo aparecían escondidas dentro de Tienda).

const CapsulesSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 1rem;
`;
const CapsulesContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 3rem 0;
`;
const CapsulesText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 2.5rem;
  h2 {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin-bottom: 0.4rem;
  }
  p {
    font-family: ${({ theme }) => theme.fonts[1]};
    color: ${({ theme }) => theme.colors.mediumGray};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    margin: 0;
  }
  .desktop-link {
    @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
      display: none;
    }
  }
`;
const CapsulesRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: nowrap;
  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    overflow: auto;
    white-space: nowrap;
    padding-bottom: 1rem;
  }
`;
const MobileLink = styled.div`
  display: none;
  text-align: center;
  margin-top: 1rem;
  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    display: block;
  }
`;

const CAPSULES_LINK = "/collections/coffee-blends?cat=capsules";

const Capsules = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.GET_PRODUCT)
      .then((res) => {
        const caps = (res.data || [])
          .filter((p) => p.category === "capsules" && p.available)
          .slice(0, 4);
        setProducts(caps);
      })
      .catch((err) => console.error("Error cargando cápsulas:", err));
  }, []);

  // Sin cápsulas disponibles, el bloque no se muestra.
  if (products.length === 0) return null;

  return (
    <CapsulesSection>
      <CapsulesContainer>
        <CapsulesText>
          <div>
            <h2>También en cápsulas</h2>
            <p>Compatibles con Nespresso y Dolce Gusto. El mismo café, listo en un minuto.</p>
          </div>
          <div className="desktop-link">
            <StyledLinks to={CAPSULES_LINK}>
              <MoreInfoArrow>Ver todas las cápsulas</MoreInfoArrow>
            </StyledLinks>
          </div>
        </CapsulesText>
        <CapsulesRow>
          {products.map((product) => (
            <Coffee
              key={product.id || product.name}
              blendName={product.name}
              listImg={product.image_url}
              to={`/collections/coffee-blends/${product.name}`}
              category={product.category}
              has_discount={product.has_discount}
              discount={product.discount}
              discounted_price={product.discounted_price}
              original_price={product.original_price}
              price={product.price}
              presentations={product.presentations}
            />
          ))}
        </CapsulesRow>
        <MobileLink>
          <StyledLinks to={CAPSULES_LINK}>
            <MoreInfoArrow>Ver todas las cápsulas</MoreInfoArrow>
          </StyledLinks>
        </MobileLink>
      </CapsulesContainer>
    </CapsulesSection>
  );
};

export default Capsules;
