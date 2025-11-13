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
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

const CostDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ fontSize }) => fontSize || '10px'};
  margin-bottom: 12px;

  span {
    font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
    font-family: 'Courier New', Courier, monospace;
  }

  &:last-child {
    border-top: 1px solid #ddd;
    padding-top: 12px;
    margin-top: 12px;
  }
`;

const MinimumAlert = styled.div`
  background-color: #f5f5f5;
  border: 1px solid ${({ theme }) => theme.colors.carioca_brickred || '#58000a'};
  color: ${({ theme }) => theme.colors.carioca_brickred || '#58000a'};
  padding: 0.8rem 1rem;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.4;
  width: 100%;
  
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.carioca_brickred || '#58000a'};
  }
`;

const Checkout = ({ checkoutList }) => {
  const [wizardComplete, setWizardComplete] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [external_reference, setExternalReference] = useState(null);
  const [deliveryType, setDeliveryType] = useState('delivery');

  useEffect(() => {
    window.scrollTo(0, 0);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails && userDetails.deliveryType) {
      setDeliveryType(userDetails.deliveryType); // Establecer el tipo de entrega
    }
    
    initMercadoPago('APP_USR-9c44ae9b-8651-40ea-9dbf-8a4561c46895', {
      locale: 'es-UY',
    });
  }, []);
  
  // Calcular el total de los items y descuentos
  const itemCalculations = checkoutList.reduce(
    (acc, item) => {
      const itemTotal = item.price * item.quantity;
      const itemOriginalPrice = (item.originalPrice || item.price) * item.quantity;
      const itemDiscount = item.hasDiscount ? (itemOriginalPrice - itemTotal) : 0;
      
      return {
        subtotal: acc.subtotal + itemOriginalPrice,
        itemTotal: acc.itemTotal + itemTotal,
        totalDiscount: acc.totalDiscount + itemDiscount
      };
    },
    { subtotal: 0, itemTotal: 0, totalDiscount: 0 }
  );

  const itemTotals = itemCalculations.itemTotal;
  const totalDiscounts = itemCalculations.totalDiscount;
  const subtotalBeforeDiscount = itemCalculations.subtotal;

  // El envío ahora es siempre gratis, pero hay compra mínima de $1000
  const shippingCost = 0;
  const MINIMUM_ORDER = 1000;
  const canCheckout = itemTotals >= MINIMUM_ORDER;

  // Calcular el total final
  const totalWithShipping = itemTotals + shippingCost;

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
      console.log('Order API URL:', orderApiUrl);
      const APitoke = process.env.REACT_APP_API_TOKEN;
      
      const response = await axios.post(orderApiUrl, orderBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });

      console.log('Order created:', response.data);
      localStorage.removeItem('checkoutList');
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
  
      const items = checkoutList.map(item => ({
        title: item.blendName,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
      }));
  
      // Cuerpo de la solicitud para crear la preferencia en Mercado Pago
      const requestBody = {
        external_reference: externalReference,
        items: items,
      };
  
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));
  
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
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

  useEffect(() => {
    if (wizardComplete) {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails && userDetails.deliveryType) {
        setDeliveryType(userDetails.deliveryType);
      }
    }
  }, [wizardComplete]);

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
              {!canCheckout && (
                <MinimumAlert>
                  <strong>¡Compra mínima no alcanzada!</strong><br />
                  Te faltan <strong>${Math.ceil(MINIMUM_ORDER - itemTotals)}</strong> para llegar al mínimo de <strong>$1000</strong>.
                </MinimumAlert>
              )}
              <TotalContainer>
                {totalDiscounts > 0 && (
                  <>
                    <CostDetail fontSize='14px'>
                      <span>Subtotal: </span>
                      <span>${subtotalBeforeDiscount.toFixed(2)}</span>
                    </CostDetail>
                    <CostDetail fontSize='14px' style={{ color: '#58000a' }}>
                      <span>Descuentos: </span>
                      <span>-${totalDiscounts.toFixed(2)}</span>
                    </CostDetail>
                  </>
                )}
                <CostDetail fontSize='18px' isBold>
                  <span>Total: </span>
                  <span>${totalWithShipping.toFixed(2)}</span>
                </CostDetail>
              </TotalContainer>
              {!preferenceId && (
                <SimpleButton
                  bg={(props) => props.theme.colors.darkGray}
                  color={(props) => props.theme.colors.white}
                  type="button"
                  width="100%"
                  disabled={!wizardComplete || !canCheckout}
                  onClick={handlePayment}
                  style={{ opacity: (!wizardComplete || !canCheckout) ? 0.5 : 1, cursor: (!wizardComplete || !canCheckout) ? 'not-allowed' : 'pointer' }}
                >
                  {canCheckout ? 'Generar Pago' : `Mínimo $${MINIMUM_ORDER} para continuar`}
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