import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa"; // Asegúrate de tener instalado react-icons
import { optimized, fallbackToOriginal } from "../../utils/imageUrl";

// Imagen hero de la home: se sirve redimensionada y en WebP vía wsrv.nl.
// Si cambia esta URL, actualizar también el <link rel="preload"> en public/index.html.
const HERO_IMAGE =
  "https://bucketcarioca.s3.us-east-1.amazonaws.com/Images/image.png.png";

const IntroSection = styled.section`
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    display: flex;
  }
  min-height: 90vh; /* Asegúrate de que el contenedor ocupe toda la altura de la ventana */
  position: relative;

  width: 100;
  overflow-x: hidden;
`;

const IntroLeft = styled.div`
  padding: 4.5rem 0;
  width: 100%;

  display: grid;
  place-content: center;
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.laptop768}) {
    min-height: 85vh;
  }
`;

const IntroRight = styled.div`
  position: relative;
  min-height: 85vh; /* Aumentar la altura del contenedor */
  width: 100%;
  display: grid;
  place-content: center;
  overflow: hidden;
  box-sizing: border-box;
  overflow-x: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.08) 38%, rgba(0, 0, 0, 0.48) 100%),
      radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.2) 100%);
    pointer-events: none;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 1;
    transform: translate(-50%, -50%);
    object-fit: cover; /* Hace que el video siempre cubra todo el contenedor */
    overflow-x: hidden;
}


`;

const IntroRightBanner = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 2rem 0 4rem;
  width: 90%;
  z-index: 2; // Asegúrate de que el texto esté por encima del video
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.6rem;
  h2 {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.xbig};
    font-weight: 900;
    font-family: ${({ theme }) => theme.fonts[3]};
    color: ${({ theme }) => theme.colors.carioca_cremitwhite};
    opacity: 90%;
    margin-bottom: 2rem;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.xlarge};
      line-height: 4rem;
    }
  }
  p {
    font-family: ${({ theme }) => theme.fonts[1]};
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
    color: ${({ theme }) => theme.colors.white};
    letter-spacing: ${({ theme }) => theme.letterspace.small};
    line-height: 1.6;
    max-width: 760px;
    margin: 0;
    text-wrap: balance;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.7);
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.xmedium};
    }
  }
  button {
    background-color: ${({ theme }) => theme.colors.carioca_black};
    color: ${({ theme }) => theme.colors.white};
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 0.2rem;
    width: clamp(12rem, 24vw, 15rem);
    max-width: none;
    min-height: clamp(3.25rem, 6vw, 3.75rem);
    height: auto;
    margin-top: 0.4rem;
    font-size: clamp(0.95rem, 1.5vw, 1.15rem);
    line-height: 1.15;
    font-family: ${({ theme }) => theme.fonts[1]};
    font-weight: 600;
    white-space: nowrap;
   
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.colors.carioca_brickred};
      transform: translateY(-2px);
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    width: 80%;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  bottom: 20px; /* Ajusta la distancia del botón desde el fondo */
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
  font-size: 2rem; /* Tamaño de la flecha */
  color: ${({ theme }) => theme.colors.white}; /* Color de la flecha */
  transition: transform 0.3s;

  &:hover {
    transform: translateX(-50%) translateY(5px); /* Efecto al pasar el cursor */
  }
`;

const Heritage = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-shadow: 0 3px 18px rgba(0, 0, 0, 0.7);
`;

const Since = styled.p`
  && {
    margin: 0 0 0.85rem;
    font-family: ${({ theme }) => theme.fonts[0]}, Georgia, serif;
    font-size: clamp(1.15rem, 3vw, 1.8rem);
    font-weight: 700;
    letter-spacing: 0.42em;
    line-height: 1;
  }
`;

const BrandLine = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts[0]}, Georgia, serif;
  font-size: clamp(1.75rem, 5vw, 3.25rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  line-height: 1.15;
  text-transform: uppercase;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: clamp(1.55rem, 7vw, 2.2rem);
    letter-spacing: 0.1em;
  }

  &::after {
    content: "";
    display: block;
    width: 72px;
    height: 2px;
    margin: 1.2rem auto 0;
    background: ${({ theme }) => theme.colors.white};
    opacity: 0.85;
  }
`;





const Intro = () => {
  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight * 0.95, behavior: "smooth" });
  };

  return (
    <>
      <IntroSection>
        <IntroRight>
          <img
            src={optimized(HERO_IMAGE, 1600)}
            onError={fallbackToOriginal(HERO_IMAGE)}
            alt="Granos de café Carioca"
            fetchpriority="high"
            decoding="async"
          />
          
            <IntroRightBanner>
            <Heritage aria-label="Desde 1916, la marca del café">
              <Since>DESDE 1916</Since>
              <BrandLine>La marca del café</BrandLine>
            </Heritage>
            <p>
              Más de un siglo seleccionando café con carácter, tradición y oficio en Montevideo.
            </p>
            <Link to={`/collections/coffee-blends`}>
              <button>Ir a tienda</button>
            </Link>
          </IntroRightBanner>
          <ScrollButton onClick={scrollToNextSection}>
            <FaArrowDown />
          </ScrollButton>
        </IntroRight>
      </IntroSection>
    </>
  );
};

export default Intro;
