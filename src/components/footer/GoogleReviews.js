import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const Review = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ReviewAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ReviewText = styled.div`
  font-size: 14px;
`;

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const API_KEY = 'AIzaSyAc8LWhTfVyDkEcnOWWM2Zd01JCFpO20T4'; // Reemplaza con tu API Key
  const PLACE_ID = 'ChIJ8f9tgHqBn5URB2SmHOSOaW8'; // Reemplaza con el Place ID de tu negocio

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${PLACE_ID}&key=${API_KEY}`
        );
        setReviews(response.data.result.reviews);
      } catch (error) {
        console.error('Error fetching Google Reviews:', error);
      }
    };

    fetchReviews();
  }, [API_KEY, PLACE_ID]);

  return (
    <ReviewsContainer>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review key={review.author_name}>
            <ReviewAuthor>{review.author_name}</ReviewAuthor>
            <ReviewText>{review.text}</ReviewText>
          </Review>
        ))
      ) : (
        <div>No reviews found</div>
      )}
    </ReviewsContainer>
  );
};

export default GoogleReviews;