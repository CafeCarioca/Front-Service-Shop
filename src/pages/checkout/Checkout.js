import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wizard from "../../components/checkoutSummary/Wizard";
import { CheckoutItem } from "../index";
import { SimpleButton } from "../../UI/Buttons/Buttons";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { API_ENDPOINTS } from "../../apiConfig";
import axios from 'axios';

const CheckoutSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightestGray};
  min-height: 90vh;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    grid-template-columns: 2fr 2.5fr; // Ajusta la proporción según tus necesidades
    padding: 3rem 2rem;
  }
`;

const CheckoutContainer = styled.div`
  width: 100%;
  margin: 10px auto;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    width: 80%;  // Ajusta el ancho para que ocupe más espacio horizontalmente
    h1 {
      margin-bottom: 2rem;
    }
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
  width: 80%;
  text-align: center;
  display: grid;
  place-items: center;
`;

const H1 = styled.h1`
  text-align: left;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts[0]};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: 1rem;
  }
`;

const TotalContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-left: none;
  border-right: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  margin-bottom: 1rem;

  span {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: 600;
    display: inline-block;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    padding: 1.5rem 3rem;
    span {
      font-size: ${({ theme }) => theme.fontSizes.xmedium};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    padding: 1.5rem 3rem;
    span {
      font-size: ${({ theme }) => theme.fontSizes.xmedium};
    }
  }
`;

const Checkout = ({ checkoutList }) => {
  const [wizardComplete, setWizardComplete] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [external_reference, setExternalReference] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    initMercadoPago('APP_USR-9c44ae9b-8651-40ea-9dbf-8a4561c46895', {
      locale: 'es-UY',
    });
  }, []);
  
  const itemTotals = checkoutList.reduce(
    (accumulator, currValue) =>
      accumulator + +(currValue.price * currValue.quantity),
    0
  );

  const createOrder = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const checkoutList = JSON.parse(localStorage.getItem('checkoutList'));

      const externalReference = `order-${Date.now()}`; // Ejemplo: un timestamp único
      setExternalReference(externalReference);
      localStorage.setItem('externalReference', externalReference);

      const orderBody = {
        order: {
          external_reference: externalReference,
          userDetails: userDetails,
          products: checkoutList
        }
      };

      console.log('Order body:', orderBody);

      const orderApiUrl = API_ENDPOINTS.CREATE_ORDER;
      
      const response = await axios.post(orderApiUrl, orderBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Order created:', response.data);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  const handlePayment = async () => {
    try {
      createOrder();
      const externalReference = localStorage.getItem('externalReference');
      setExternalReference(externalReference);
      const apiUrl = API_ENDPOINTS.CREATE_PREFERENCE;
  
      const requestBody = {
        external_reference: externalReference,
        items: checkoutList.map(item => ({
          title: item.blendName,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      };
  
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));
  
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response data:', response.data);
      setPreferenceId(response.data.id);
      console.log('PreferenceId:', response.data.id);
    } catch (error) {
      console.error("Error al obtener el preferenceId:", error);
    }
  };

  useEffect(() => {
    if (preferenceId) {
      localStorage.setItem('preferenceId', preferenceId);
    }
  }, [preferenceId]);

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
                <span>Importe total</span> <span>${itemTotals}</span>
              </TotalContainer>
              {!preferenceId && (
                <SimpleButton
                  bg={(props) => props.theme.colors.darkGray}
                  color={(props) => props.theme.colors.white}
                  type="button"
                  width="100%"
                  disabled={!wizardComplete}
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