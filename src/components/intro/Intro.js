import React from "react";
import styled from "styled-components";
import MainLogo from "../../UI/Logo/Logo";
import coffeeVideo from "../../assets/images/4081313-uhd_3840_2160_24fps.mp4";  // Asegúrate de que la ruta sea correcta
import imagefondo from "../../assets/images/image.png";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa"; // Asegúrate de tener instalado react-icons

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
  padding: 2rem 0;
  width: 90%;
  z-index: 2; // Asegúrate de que el texto esté por encima del video
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
    line-height: 1.5rem;
    @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
      font-size: ${({ theme }) => theme.fontSizes.xmedium};
    }
  }
  button {
    background-color: ${({ theme }) => theme.colors.carioca_black};
    color: ${({ theme }) => theme.colors.white};
    padding: 0.5rem 2.5rem;
    border: none;
    border-radius: 0.2rem;
    width: 100%;
    max-width: 10rem;
    height: 3rem;
    margin-top: 2rem;
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
    font-family: ${({ theme }) => theme.fonts[1]};
   
    cursor: pointer;
    transition: background-color 1s;
    &:hover {
      background-color: ${({ theme }) => theme.colors.carioca_brickred};
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

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border: 8px solid white;
  border-radius: 9999px;
  padding: 1rem 5rem;
  font-weight: bold;
  color: white;
  background-color: transparent;
  font-size: 1.5rem;
  letter-spacing: 0.06rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); /* leve glow para resaltar sobre fondo */
  margin-bottom: 2.5rem;
  .dot {
    font-size: 1.8rem;
    line-height: 1;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.xlgLaptop}) {
    font-size: 1.8rem;
    padding: 1.2rem 6rem;
    border: 10px solid white;
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
          {/* <video autoPlay loop muted>
            <source src={coffeeVideo} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video> */}
          <img src={"https://bucketcarioca.s3.us-east-1.amazonaws.com/Images/image.png.png"} alt="Carioca Logo" />
          
            <IntroRightBanner>
            <Badge>
            <span>DESDE 1916</span>
            <span className="dot">·</span>
            <span>Montevideo, Uruguay</span>
            </Badge>
            <p>
              Más de un siglo de pasión por el café, combinando calidad, tradición y momentos únicos. Te invitamos a ser parte de nuestra historia.
            </p>
            <Link to={`/collections/coffee-blends`}>
              <button>Comprar</button>
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