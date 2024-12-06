import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from "../apiConfig";
import axios from 'axios'; // Asegúrate de que axios esté instalado

const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.lightestGray};
  padding: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    padding: 2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    padding: 3rem;
  }
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts[0]};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: 2rem;
    line-height: 2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
`;

const P = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-family: ${({ theme }) => theme.fonts[1]};
  margin-bottom: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: 1rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    font-size: 1.125rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkGray};
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumGray};
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
`;

// Función para enviar el email de confirmación de la orden
// const sendOrderEmail = async (orderId) => {
//   try {
//     const apiUrl = API_ENDPOINTS.SEND_ORDER_EMAIL;
//     const response = await axios.post(`${apiUrl}`, { orderId });
//     console.log(response.data);
//     if (response.status === 200) {
//       console.log('Email enviado con éxito');
//     }
//   } catch (error) {
//     console.error('Error al enviar el email de confirmación:', error);
//   }
// };

const ThankYou = () => {
  useEffect(() => {
    // Borra inmediatamente el 'checkoutList' cuando el componente se monta
    localStorage.removeItem('checkoutList');
  }, []);

  return (
    <ThankYouContainer>
      <H1>¡Muchas gracias por comprar con nosotros!</H1>
      <P>Se te enviará un mail con la confirmación de tu compra.</P>
      <Button to="/">Volver a la página principal</Button>
    </ThankYouContainer>
  );
};

export default ThankYou;