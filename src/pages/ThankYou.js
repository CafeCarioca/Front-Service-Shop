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
`;

const H1 = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts[0]};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.5rem;
`;

const P = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-family: ${({ theme }) => theme.fonts[1]};
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
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
`;

const ThankYou = () => {
  useEffect(() => {
    const preferenceId = localStorage.getItem('preferenceId'); // Obtener el preference_id del localStorage
    const apiUrl = API_ENDPOINTS.CHANGESTATUSBYPREFID
    if (preferenceId) {
      // Llama a la API para cambiar el estado de la orden
      const changeOrderStatus = async () => {
        try {
          const response = await axios.put(`${apiUrl}/${preferenceId}`); // Cambia la URL a la de tu API
          console.log(response.data); // Maneja la respuesta si es necesario
          if (response.status === 200) {
            localStorage.removeItem('preferenceId');
         }
        } catch (error) {
          console.error('Error al cambiar el estado de la orden:', error);
          // Manejo de errores aquí si es necesario
        } 
      };

      changeOrderStatus();
    }
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