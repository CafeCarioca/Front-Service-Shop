import React, { useEffect, useState } from "react";
import styled from "styled-components";

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroVideo autoPlay loop muted playsInline>
          <source src="/coffee-hero.mp4" type="video/mp4" />
        </HeroVideo>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Un sabor que une generaciones.</HeroTitle>
          <HeroSubtitle>Desde 1916, la marca del café.</HeroSubtitle>
          <ScrollIndicator>↓</ScrollIndicator>
        </HeroContent>
      </HeroSection>

      {/* Introducción */}
      <IntroSection>
        <Container>
          <FadeInSection scrollY={scrollY}>
            <SectionTitle>Más de cien años después, seguimos haciendo café como el primer día.</SectionTitle>
          </FadeInSection>
        </Container>
      </IntroSection>

      {/* Documento Histórico */}
      <HistoricalDocSection>
        <Container>
          <DocumentWrapper scrollY={scrollY}>
            <DocumentTitle>El Origen</DocumentTitle>
            <DocumentSubtitle>7 de octubre de 1916 - Registro oficial de la marca</DocumentSubtitle>
            <DocumentImageWrapper>
              <DocumentImage src="/nuestra-historia.jpg" alt="Documento histórico registro marca El Carioca 1916" />
              <DocumentCaption>
                Documento original del registro de la marca "El Carioca" ante la Tesorería General 
                del Estado, fechado el 7 de octubre de 1916, bajo la Ley de Marcas de Fábrica de Comercio 
                del 14 de julio de 1908.
              </DocumentCaption>
            </DocumentImageWrapper>
          </DocumentWrapper>
        </Container>
      </HistoricalDocSection>

      {/* Timeline */}
      <TimelineSection>
        <RoadContainer>
          <Road />
          <ScrollCar 
            src="/vintage-car.png"  
            alt="Auto vintage" 
            style={{ 
              left: `${Math.max(0, Math.min((scrollY - 1800) / 8, 95))}%`,
              opacity: scrollY > 1600 ? Math.min((scrollY - 1600) / 200, 1) : 0
            }} 
          />
        </RoadContainer>
        <Container>
          <SectionTitle>Más de 100 años de tradición</SectionTitle>
          <Timeline>
            <TimelineItem delay={0}>
              <TimelineYear>4 de Octubre 1916</TimelineYear>
              <TimelineContent>
                <h3>Nace El Carioca</h3>
                <p>Se crea Café El Carioca en Montevideo. Comienza la importación de café verde, 
                   tostado, torrado, glaseado y molido con servicio express.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem delay={200}>
              <TimelineYear>1920s-1950s</TimelineYear>
              <TimelineContent>
                <h3>Posicionamiento en el mercado</h3>
                <p>Café El Carioca se posiciona como uno de los cafés más importantes del país. 
                   El nombre "Café El Carioca" se observa en muchísimas marquesinas y puestos 
                   de venta de Uruguay.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem delay={400}>
              <TimelineYear>2000s</TimelineYear>
              <TimelineContent>
                <h3>Modernización</h3>
                <p>Incorporamos nuevas técnicas de tostado, exploramos granos de distintas regiones 
                   y perfeccionamos nuestro perfil de sabor.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem delay={600}>
              <TimelineYear>Hoy</TimelineYear>
              <TimelineContent>
                <h3>Tradición + Innovación</h3>
                <p>Nuevos formatos, tecnología moderna, pero la misma esencia. 
                   Un café que respeta su origen y a quienes lo disfrutan.</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Container>
      </TimelineSection>

      {/* Cultura artesanal */}
      <ArtisanSection>
        <ParallaxImage style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        <Container>
          <ContentBox>
            <h2>Cultura de trabajo artesanal</h2>
            <p>
              En El Carioca las cosas se hacen a mano, con atención al detalle y respeto por el producto.
              Seleccionamos granos de origen, controlamos cada etapa del tostado y elaboramos nuestros 
              cafés manteniendo procesos que combinan tradición y conocimiento técnico.
            </p>
            <Highlight>No buscamos hacer café rápido. Buscamos hacerlo bien.</Highlight>
          </ContentBox>
        </Container>
      </ArtisanSection>

      {/* Familia y comunidad */}
      <CommunitySection>
        <Container>
          <TwoColumns>
            <TextColumn>
              <h2>Familia, oficio y comunidad</h2>
              <p>
                Somos una empresa familiar uruguaya que creció acompañando a generaciones enteras.
                Nuestro vínculo con la comunidad, las familias, las oficinas y los comercios es 
                parte central de quienes somos.
              </p>
              <p>
                El Carioca no es solo una marca: es un encuentro, un aroma, un recuerdo compartido.
              </p>
            </TextColumn>
            <ImageColumn>
              <StyledImage src="/familia.jpeg" alt="Familia Carioca" />
            </ImageColumn>
          </TwoColumns>
        </Container>
      </CommunitySection>

      {/* Nuestra promesa */}
      <PromiseSection>
        <Container>
          <PromiseContent>
            <h2>Nuestra promesa</h2>
            <p>
              Creemos en el café como pausa, como compañía, como momento. Por eso cuidamos cada detalle: 
              desde el grano que elegimos hasta el empaquetado final. Queremos que, cada vez que abrís 
              un Carioca, sientas la misma dedicación con la que empezamos hace más de 100 años.
            </p>
            <BrandClaim>
              Café El Carioca. Un clásico uruguayo que sigue escribiendo su historia.
            </BrandClaim>
          </PromiseContent>
        </Container>
      </PromiseSection>
    </>
  );
};

export default AboutUs;

// Styled Components
const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #8B4513 0%, #4A2511 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 4px 10px rgba(0,0,0,0.3);
  animation: fadeInUp 1s ease-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.3s both;
`;

const ScrollIndicator = styled.div`
  font-size: 2rem;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const IntroSection = styled.section`
  padding: 8rem 0 6rem;
  background: #f8f6f3;
`;

const FadeInSection = styled.div`
  text-align: center;
  opacity: ${props => props.scrollY > 200 ? 1 : 0};
  transform: translateY(${props => props.scrollY > 200 ? 0 : '30px'});
  transition: all 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: #4A2511;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const IntroText = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: #5a5a5a;
  max-width: 900px;
  margin: 0 auto 2rem;
`;

const HighlightBox = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 2rem;
  background: linear-gradient(135deg, #8B4513 0%, #6d3410 100%);
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  line-height: 1.8;
  box-shadow: 0 4px 20px rgba(139, 69, 19, 0.2);
  
  strong {
    color: #d4b896;
    font-size: 1.3rem;
  }
`;

const HistoricalDocSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #f8f6f3 0%, #ebe8e3 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #d4b896, transparent);
  }
`;

const DocumentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  opacity: ${props => props.scrollY > 400 ? 1 : 0};
  transform: translateY(${props => props.scrollY > 400 ? 0 : '50px'});
  transition: all 1s ease-out;
`;

const DocumentTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #4A2511;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: "Playfair Display", "Times New Roman", serif;
  font-style: italic;
`;

const DocumentSubtitle = styled.p`
  font-size: 1.3rem;
  color: #8B4513;
  margin-bottom: 3rem;
  font-weight: 500;
`;

const DocumentImageWrapper = styled.div`
  position: relative;
  max-width: 700px;
  margin: 0 auto;
`;

const DocumentImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 
    0 20px 60px rgba(0,0,0,0.3),
    0 0 0 1px rgba(139, 69, 19, 0.1),
    inset 0 0 0 1px rgba(255,255,255,0.5);
  transform: perspective(1000px) rotateY(-2deg);
  transition: transform 0.5s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(0deg) scale(1.02);
  }
  
  @media (max-width: 768px) {
    transform: none;
  }
`;

const DocumentCaption = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  font-style: italic;
  padding: 0 2rem;
`;

const TimelineSection = styled.section`
  padding: 8rem 0;
  background: white;
  position: relative;
  overflow: hidden;
`;

const RoadContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 1;
`;

const Road = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to bottom, #4a4a4a, #2a2a2a);
  transform: translateY(-50%);
  clip-path: polygon(
    0% 40%, 1% 60%, 2% 35%, 3% 65%, 4% 45%, 5% 55%, 6% 30%, 7% 70%, 
    8% 50%, 9% 40%, 10% 60%, 11% 35%, 12% 65%, 13% 45%, 14% 55%, 15% 30%,
    16% 70%, 17% 50%, 18% 40%, 19% 60%, 20% 35%, 21% 65%, 22% 45%, 23% 55%,
    24% 30%, 25% 70%, 26% 50%, 27% 40%, 28% 60%, 29% 35%, 30% 65%, 31% 45%,
    32% 55%, 33% 30%, 34% 70%, 35% 50%, 36% 40%, 37% 60%, 38% 35%, 39% 65%,
    40% 45%, 41% 55%, 42% 30%, 43% 70%, 44% 50%, 45% 40%, 46% 60%, 47% 35%,
    48% 65%, 49% 45%, 50% 55%, 51% 30%, 52% 70%, 53% 50%, 54% 40%, 55% 60%,
    56% 35%, 57% 65%, 58% 45%, 59% 55%, 60% 30%, 61% 70%, 62% 50%, 63% 40%,
    64% 60%, 65% 35%, 66% 65%, 67% 45%, 68% 55%, 69% 30%, 70% 70%, 71% 50%,
    72% 40%, 73% 60%, 74% 35%, 75% 65%, 76% 45%, 77% 55%, 78% 30%, 79% 70%,
    80% 50%, 81% 40%, 82% 60%, 83% 35%, 84% 65%, 85% 45%, 86% 55%, 87% 30%,
    88% 70%, 89% 50%, 90% 40%, 91% 60%, 92% 35%, 93% 65%, 94% 45%, 95% 55%,
    96% 30%, 97% 70%, 98% 50%, 99% 40%, 100% 60%
  );
  opacity: 0.8;
`;

const ScrollCar = styled.img`
  position: absolute;
  top: 50%;
  left: 0;
  width: 130px;
  height: auto;
  opacity: 0;
  transition: left 0.1s linear, opacity 0.3s ease-out;
  z-index: 2;
  transform: translateY(-50%);
  will-change: left, opacity;
  
  @media (max-width: 768px) {
    width: 90px;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 900px;
  margin: 4rem auto 0;
  padding-top: 8rem;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #d4b896;
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 6rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: ${props => props.delay}ms;
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  &:nth-child(odd) {
    padding-right: 55%;
    padding-left: 3rem;
    text-align: right;
    
    ${'' /* Punto en la línea */}
    &::before {
      content: '';
      position: absolute;
      right: calc(50% - 12px);
      top: 0;
      width: 24px;
      height: 24px;
      background: #8B4513;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #d4b896;
    }
  }
  
  &:nth-child(even) {
    padding-left: 55%;
    padding-right: 3rem;
    text-align: left;
    
    &::before {
      content: '';
      position: absolute;
      left: calc(50% - 12px);
      top: 0;
      width: 24px;
      height: 24px;
      background: #8B4513;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #d4b896;
    }
  }
  
  @media (max-width: 768px) {
    padding-right: 0 !important;
    padding-left: 3rem !important;
    text-align: left !important;
    
    &::before {
      left: 0 !important;
      right: auto !important;
    }
  }
`;

const TimelineYear = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  font-family: "Playfair Display", "Times New Roman", serif;
  color: #8B4513;
  margin-bottom: 1rem;
  margin-left: ${props => (props.even ? '0' : 'auto')};
`;

const TimelineContent = styled.div`
  h3 {
    font-size: 1.6rem;
    color: #4A2511;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #666;
  }
`;

const ArtisanSection = styled.section`
  position: relative;
  padding: 10rem 0;
  background: #1a1410;
  overflow: hidden;
`;

const ParallaxImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/placeholder-coffee-process.jpg') center/cover;
  opacity: 0.3;
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: white;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;

const Highlight = styled.p`
  font-size: 1.5rem !important;
  font-weight: 600;
  font-style: italic;
  color: #d4b896 !important;
  margin-top: 3rem !important;
`;

const CommunitySection = styled.section`
  padding: 8rem 0;
  background: #f8f6f3;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextColumn = styled.div`
  h2 {
    font-size: 2.5rem;
    color: #4A2511;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 1.5rem;
  }
`;

const ImageColumn = styled.div``;
const StyledImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: center 0%;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  filter: sepia(0.2) contrast(1.1);
  transition: all 0.5s ease;

  &:hover {
    filter: sepia(0) contrast(1);
    transform: translateY(-5px);
    box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  }
`;

const PromiseSection = styled.section`
  padding: 8rem 0;
  background: #1a1410;
  color: white;
`;

const PromiseContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: white;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 3rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const BrandClaim = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  font-style: italic;
  color: #d4b896;
  padding: 2rem;
  border-top: 2px solid #d4b896;
  border-bottom: 2px solid #d4b896;
`;
