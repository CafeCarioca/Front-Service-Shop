import React from "react";
import styled from "styled-components";
import Buttons from "../../UI/Buttons/Buttons";
import coffeeBlendsData from "../coffees/CoffeeData";
import featuredCoffee from "../../assets/images/featuredCoffee.JPG";

const FeaturedSection = styled.section`
  /* En móviles, la sección se apila (columna). En pantallas grandes, en fila */
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    flex-direction: row;
    height: 600px; /* Altura fija en pantallas grandes */
  }
`;

/* Lado izquierdo con fondo café oscuro */
const FeaturedLeft = styled.div`
  background-color: #27231f; /* Café oscuro */
  color: #fff;
  padding: 2rem;

  /* En pantallas grandes, ocupa la mitad del ancho y el 100% de la altura */
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    flex: 1;
    height: 100%;
    display: flex; 
    align-items: stretch; /* Para que el contenedor interno llene la altura */
  }
`;

/* Contenedor interno para distribuir elementos verticalmente */
const FeaturedLeftContent = styled.div`
  flex: 1; /* Se expande para llenar el alto disponible */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* Distribución uniforme a lo largo del eje vertical */
`;

const FeaturedTag = styled.span`
  display: inline-block;
  background-color: #444;
  color: #fff;
  padding: 0.3rem 0.6rem;
  text-transform: uppercase;
  border-radius: 0.2rem;
  /* Asegura que no se expanda horizontalmente en un contenedor flex */
  align-self: flex-start; 
  width: auto;
`;

const Title = styled.h2`
  margin: 0; /* Quitamos márgenes para que la distribución sea más pareja */
  color: #fff;
  font-family: ${({ theme }) => theme.fonts[3]};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
    font-size: ${({ theme }) => theme.fontSizes.xxbig};
  }
`;

const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  line-height: 1.3rem;
  color: #ccc;
`;

const FeaturedRight = styled.div`
  /* Lado derecho para la imagen */
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    flex: 1;
    height: 100%;
  }
`;

const FeaturedImg = styled.img`
  /* Ocupa todo el ancho y alto disponibles, sin deformarse */
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const FeaturedBlend = () => {
  const { description, singleImg, blendName } = coffeeBlendsData[4];

  return (
    <FeaturedSection>
      <FeaturedLeft>
        {/* Contenedor interno para espaciar elementos verticalmente */}
        <FeaturedLeftContent>
          <FeaturedTag>Blend destacado</FeaturedTag>
          <Title>{blendName}</Title>
          <Description>{description}</Description>
          <Buttons
            bg={(props) => props.theme.colors.lightestGray}
            width={"100%"}
            color={(props) => props.theme.colors.darkGray}
            to={`/collections/coffee-blends/${blendName}`}
          >
            Ver Producto
          </Buttons>
        </FeaturedLeftContent>
      </FeaturedLeft>

      <FeaturedRight>
        <FeaturedImg
          src={singleImg || featuredCoffee}
          alt="Featured coffee"
        />
      </FeaturedRight>
    </FeaturedSection>
  );
};

export default FeaturedBlend;
