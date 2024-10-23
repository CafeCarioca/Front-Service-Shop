import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wizard from "../../components/checkoutSummary/Wizard";
import { CheckoutItem } from "../index";
import { SimpleButton } from "../../UI/Buttons/Buttons";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const CheckoutSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightestGray};
  min-height: 90vh;
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 2fr 2.5fr;  // Ajusta la proporción según tus necesidades
  gap: 1rem;
`;

const CheckoutContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  h1 {
    margin-bottom: 3rem;
    text-align: center;
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    width: 80%;  // Ajusta el ancho para que ocupe más espacio horizontalmente
  }
`;

const CheckoutItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    grid-template-columns: 1fr 1fr;  // Dos columnas en pantallas más grandes
  }
`;

const CheckoutFooter = styled.div`
  width: 100%;
  text-align: center;
  display: grid;
  place-items: center;
`;

const H1 = styled.h1`
  text-align: left;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts[0]};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.5rem;
  margin-left: 0;
`;

const TotalContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-left: none;
  border-right: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  margin-bottom: 1rem;
  span {
    font-size: ${({ theme }) => theme.fontSizes.xmedium};
    font-weight: 600;
    display: inline-block;
  }
`;

const Checkout = ({ checkoutList }) => {
  const [wizardComplete, setWizardComplete] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    initMercadoPago('APP_USR-9c44ae9b-8651-40ea-9dbf-8a4561c46895',
      {
        locale: 'es-UY',
      }
    );
  }, []);
  
  const itemTotals = checkoutList.reduce(
    (accumulator, currValue) =>
      accumulator + +(currValue.price * currValue.quantity),
    0
  );

  const handlePayment = async () => {
    try {
      const apiUrl = 'https://5hjzm8qivl.execute-api.us-east-1.amazonaws.com/Stage1/';
  
      // Construye el cuerpo de la solicitud
      const requestBody = {
        items: checkoutList.map(item => ({
          title: item.blendName,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      };
  
      // Imprime el cuerpo de la solicitud antes de enviarlo
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));
  
      // Envía la solicitud POST
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsedBody = JSON.parse(response.data.body);
  
      // Maneja la respuesta
      console.log('Response data:', response.data);
      setPreferenceId(parsedBody.id);
      console.log('PreferenceId:', parsedBody.id);
    } catch (error) {
      console.error("Error al obtener el preferenceId:", error);
    }
  };

  return (
    <CheckoutSection>
      <div>
        <Wizard onCompletion={setWizardComplete} />
      </div>
      <div>
        <CheckoutContainer>
          <div>
            <H1>Detalle del pedido</H1>
            {checkoutList.length === 0 && <H1>No tienes nada en tu carrito</H1>}
            <CheckoutItemsContainer>
              {checkoutList.map((item, index) => {
                return <CheckoutItem key={index} {...item}></CheckoutItem>;
              })}
            </CheckoutItemsContainer>
          </div>
          {checkoutList.length > 0 && (
            <CheckoutFooter>
              <TotalContainer>
                <span>Importe total</span> <span>${itemTotals}.00</span>
              </TotalContainer>
              {!preferenceId && (
                <SimpleButton
                  bg={(props) => props.theme.colors.darkGray}
                  color={(props) => props.theme.colors.white}
                  type="button"
                  width="100%"
                  //disabled={!wizardComplete}
                  onClick={handlePayment}
                >
                  Generar Pago
                </SimpleButton>
              )}
              {preferenceId && (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )}
            </CheckoutFooter>
          )}
        </CheckoutContainer>
      </div>
    </CheckoutSection>
  );
};

export default Checkout;