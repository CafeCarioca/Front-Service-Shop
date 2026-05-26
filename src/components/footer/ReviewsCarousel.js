import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  .slick-prev,
  .slick-next {
    z-index: 2;
    width: 40px;
    height: 40px;
  }

  .slick-prev {
    left: -40px;
  }

  .slick-next {
    right: -40px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;
    font-size: 30px;
    line-height: 1;
  }
`;

const ReviewCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  min-height: 190px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 12px;
`;

const ReviewAvatar = styled.div`
  position: relative;
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  overflow: hidden;
  border-radius: 50%;
  background: #efe7dc;
  box-shadow: inset 0 0 0 1px rgba(80, 52, 35, 0.12);
`;

const AvatarImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarInitials = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #5b3b2b;
  font-size: 0.9rem;
  font-weight: 700;
`;

const AuthorName = styled.h3`
  overflow: hidden;
  margin: 0;
  color: #333;
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StarsAndDate = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-end;
`;

const RatingStars = styled.div`
  margin-bottom: 4px;
  color: #fbbc04;
  font-size: 1rem;
  line-height: 1;
`;

const ReviewDate = styled.span`
  color: #888;
  font-size: 0.8rem;
  white-space: nowrap;
`;

const ReviewText = styled.p`
  margin-top: 12px;
  color: #444;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const reviews = [
  {
    author_name: 'P D "CWimper"',
    rating: 5,
    time: 'Hace 8 meses',
    text: 'Excelente café, la mejor selección y con todo el cariño para los que nos gusta y entendemos de esto. Da gusto charlar con alguien que entiende del tema y sabe.',
  },
  {
    author_name: 'Barista Escobar',
    rating: 5,
    time: 'Hace 9 meses',
    text: 'Adoro el excelente asesoramiento del Sr. De León en todas las dudas que tengamos acerca del mundo del café.',
  },
  {
    author_name: 'Alejandro Aizcorbe',
    rating: 5,
    time: 'Hace 2 años',
    text: 'Pasé por el local para asesorarme por varios temas, tipo de café que me gusta y manera correcta de prepararlo. Me encontré con un ambiente muy agradable.',
  },
  {
    author_name: 'Ottozky Atchung',
    rating: 5,
    time: 'Hace un año',
    text: 'Excelente atención. El mejor café. Lo llevo sin moler y lo muelo en casa. El que atiende tiene mucho conocimiento del tema.',
  },
  {
    author_name: 'Luis Juan Zuccoli Domínguez',
    rating: 5,
    time: 'Hace 3 años',
    text: 'Excelente servicio y calidad de café. La atención de Sebastián es inigualable. Ese lugar es especial y el café es magnífico.',
  },
  {
    author_name: 'Pedro Montano',
    rating: 5,
    time: 'Hace 3 años',
    text: 'El dueño es un sabio en materia de café y prácticamente da una clase, explicando cada variedad que ofrece para catar.',
  },
  {
    author_name: 'Tape Olmedo',
    rating: 5,
    time: 'Hace 4 años',
    text: 'Excelente atención. Muy buen café y buen precio. Recomendable ir y charlar con Sebastián.',
  },
  {
    author_name: 'Julián Rapetti',
    rating: 5,
    time: 'Hace 5 años',
    text: 'Excelente atención y asesoramiento. Gran variedad de cafés para llevar o para consumir en el local.',
  },
  {
    author_name: 'Jorge Eduardo Gatti Guida',
    rating: 5,
    time: 'Hace 5 años',
    text: 'Excelente café, tuve una prueba degustativa y una soberbia clase de café. Recomendable.',
  },
  {
    author_name: 'Simo piña',
    rating: 5,
    time: 'Hace 3 años',
    text: 'Me dan gracia los comentarios porque son muy reales, pasé a comprar café y me fui con un diploma.',
  },
];

const ReviewsCarousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push('\u2605');
    }
    return stars.join('');
  };

  const getInitials = (name = '') => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const initials = words.slice(0, 2).map((word) => word[0]).join('');
    return initials.toUpperCase() || '?';
  };

  return (
    <CarouselContainer>
      <StyledSlider {...settings}>
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.author_name}-${review.time || index}`}>
            <ReviewHeader>
              <AuthorInfo>
                <ReviewAvatar>
                  <AvatarInitials>{getInitials(review.author_name)}</AvatarInitials>
                  {review.profile_photo_url && (
                    <AvatarImage
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </ReviewAvatar>
                <AuthorName>{review.author_name}</AuthorName>
              </AuthorInfo>
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

const formatDate = (unixTimestamp) => {
  if (typeof unixTimestamp === 'string') return unixTimestamp;
  if (!unixTimestamp) return '';
  const date = new Date(unixTimestamp * 1000);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export default ReviewsCarousel;
