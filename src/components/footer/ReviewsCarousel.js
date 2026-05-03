import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API_ENDPOINTS } from '../../apiConfig';

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

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.GOOGLE_REVIEWS)
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch((error) => console.error('Error al obtener resenas:', error));
  }, []);

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
  if (!unixTimestamp) return '';
  const date = new Date(unixTimestamp * 1000);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export default ReviewsCarousel;
