// ReviewsCarousel.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// --- Styled Components ---
const CarouselContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 -10px;
  }

  .slick-slide > div {
    margin: 0 10px;
  }

  .slick-dots {
    bottom: -30px;
  }

  /* Flechas */
  .slick-prev,
  .slick-next {
    z-index: 2;       /* Asegura que estén por encima de las tarjetas */
    width: 40px;      /* Ajusta el ancho del área de clic */
    height: 40px;     /* Ajusta el alto del área de clic */
  }

  .slick-prev {
    left: -40px;      /* Mueve la flecha izq. hacia afuera */
  }

  .slick-next {
    right: -40px;     /* Mueve la flecha der. hacia afuera */
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;      /* Color de las flechas */
    font-size: 30px;  /* Tamaño de las flechas */
    line-height: 1;
  }
`;

const ReviewCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  min-height: 180px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthorName = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: #333;
`;

const StarsAndDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RatingStars = styled.div`
  color: #fbbc04; /* Color típico de estrellas de Google */
  font-size: 1rem;
  margin-bottom: 4px;
`;

const ReviewDate = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const ReviewText = styled.p`
  margin-top: 10px;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.4;
`;

// --- Componente principal ---
const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/googleapi')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch((error) => console.error('Error al obtener reseñas:', error));
  }, []);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 reseñas en pantallas grandes
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Función para mostrar estrellas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push('★');
    }
    return stars.join('');
  };

  // Formatea la fecha (la API de Google trae "time" como timestamp UNIX)
  const formatDate = (unixTimestamp) => {
    if (!unixTimestamp) return '';
    const date = new Date(unixTimestamp * 1000);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <CarouselContainer>
      <StyledSlider {...settings}>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewHeader>
              <AuthorName>{review.author_name}</AuthorName>
              <StarsAndDate>
                <RatingStars>{renderStars(review.rating)}</RatingStars>
                <ReviewDate>{formatDate(review.time)}</ReviewDate>
              </StarsAndDate>
            </ReviewHeader>
            <ReviewText>{review.text}</ReviewText>
          </ReviewCard>
        ))}
      </StyledSlider>
    </CarouselContainer>
  );
};

export default ReviewsCarousel;
