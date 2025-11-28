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

const CouponContainer = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const CouponLabel = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 0.5rem;
`;

const CouponInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const CouponInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  width: 200px;
`;

const CouponButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.carioca_brickred || '#8B7E74'};
  color: white;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 0.85rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CouponError = styled.p`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 0.3rem;
`;

const CouponSuccess = styled.p`
  color: #388e3c;
  font-size: 0.75rem;
  margin-top: 0.3rem;
  font-weight: 600;
`;

const Checkout = ({ checkoutList }) => {
  const [wizardComplete, setWizardComplete] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [external_reference, setExternalReference] = useState(null);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

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
      
      // Validar si el descuento es aplicable según el delivery_type
      let isDiscountValid = false;
      if (item.hasDiscount && item.discount) {
        const discountDeliveryType = item.discount.delivery_type || 'both';
        // El descuento es válido si es 'both' o si coincide con el tipo de entrega seleccionado
        isDiscountValid = discountDeliveryType === 'both' || discountDeliveryType === deliveryType;
      }
      
      const itemDiscount = isDiscountValid ? (itemOriginalPrice - itemTotal) : 0;
      
      return {
        subtotal: acc.subtotal + itemOriginalPrice,
        itemTotal: acc.itemTotal + (isDiscountValid ? itemTotal : itemOriginalPrice),
        totalDiscount: acc.totalDiscount + itemDiscount
      };
    },
    { subtotal: 0, itemTotal: 0, totalDiscount: 0 }
  );

  const itemTotals = itemCalculations.itemTotal;
  const totalDiscounts = itemCalculations.totalDiscount;
  const subtotalBeforeDiscount = itemCalculations.subtotal;

  // Reglas de envío y mínimos:
  // - Delivery: $180 si el subtotal es menor a $1500, GRATIS si es >= $1500
  // - TakeAway: Sin costo, sin mínimo
  const FREE_SHIPPING_THRESHOLD = 1500;
  const DELIVERY_COST = 180;
  
  let shippingCost = 0;
  
  if (deliveryType === 'delivery') {
    // Para delivery: cobrar envío solo si no alcanza $1500
    shippingCost = itemTotals >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_COST;
  } else {
    // Para takeaway: sin costo
    shippingCost = 0;
  }
  
  const canCheckout = true; // Sin mínimo de compra

  // Aplicar descuento de cupón
  let couponDiscount = 0;
  if (appliedCoupon) {
    couponDiscount = appliedCoupon.discountAmount || 0;
  }

  // Calcular el total final
  const totalWithShipping = itemTotals + shippingCost - couponDiscount;

  // Función para validar cupón
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Por favor ingresa un código de cupón');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    try {
      const response = await axios.post(
        API_ENDPOINTS.VALIDATE_COUPON,
        {
          code: couponCode.toUpperCase(),
          deliveryType: deliveryType,
          orderTotal: itemTotals + shippingCost
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        }
      );

      if (response.data.valid) {
        setAppliedCoupon(response.data);
        setCouponError('');
      }
    } catch (error) {
      setCouponError(error.response?.data?.error || 'Cupón inválido');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

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
          products: checkoutList,
          shippingCost: shippingCost,
          coupon: appliedCoupon ? {
            code: appliedCoupon.coupon.code,
            discountAmount: appliedCoupon.discountAmount
          } : null
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
  
      // Calcular el subtotal de productos
      let productSubtotal = checkoutList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Si hay cupón aplicado, restar el descuento del subtotal
      const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
      productSubtotal = Math.max(0, productSubtotal - couponDiscount);

      const items = checkoutList.map(item => ({
        title: item.blendName,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      // Si hay descuento de cupón, agregarlo como un item con precio negativo
      if (couponDiscount > 0) {
        items.push({
          title: `Descuento (${appliedCoupon.coupon.code})`,
          unit_price: -Number(couponDiscount),
          quantity: 1,
        });
      }

      // Si hay costo de envío, agregarlo como un item adicional
      if (shippingCost > 0) {
        items.push({
          title: 'Costo de envío',
          unit_price: Number(shippingCost),
          quantity: 1,
        });
      }
  
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

  // Actualizar deliveryType cuando cambie en el Wizard
  useEffect(() => {
    const updateDeliveryType = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails && userDetails.deliveryType) {
        const newDeliveryType = userDetails.deliveryType;
        
        // Si cambió el tipo de entrega, verificar si el cupón sigue siendo válido
        if (newDeliveryType !== deliveryType && appliedCoupon) {
          const couponDeliveryType = appliedCoupon.coupon.delivery_type;
          
          // Si el cupón no es válido para el nuevo tipo de entrega, limpiarlo
          if (couponDeliveryType !== 'both' && couponDeliveryType !== newDeliveryType) {
            setAppliedCoupon(null);
            setCouponCode('');
            setCouponError('El cupón no es válido para este tipo de entrega');
          }
        }
        
        setDeliveryType(newDeliveryType);
      }
    };

    // Verificar cambios cada vez que el wizard se actualice
    updateDeliveryType();
    
    // Agregar listener para cambios en localStorage
    window.addEventListener('storage', updateDeliveryType);
    
    // Intervalo para verificar cambios (backup si storage event no funciona)
    const interval = setInterval(updateDeliveryType, 500);

    return () => {
      window.removeEventListener('storage', updateDeliveryType);
      clearInterval(interval);
    };
  }, [wizardComplete, deliveryType, appliedCoupon]);

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
                return <CheckoutItem key={index} {...item} deliveryType={deliveryType}></CheckoutItem>;
              })}
            </CheckoutItemsContainer>
          </div>
          {checkoutList.length > 0 && (
            <CheckoutFooter>
              <CouponContainer>
                <CouponLabel>¿Tenés un cupón de descuento?</CouponLabel>
                <CouponInputContainer>
                  <CouponInput
                    type="text"
                    placeholder="CÓDIGO"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={appliedCoupon !== null}
                  />
                  <CouponButton
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || appliedCoupon !== null}
                  >
                    {couponLoading ? 'Validando...' : appliedCoupon ? 'Aplicado' : 'Aplicar'}
                  </CouponButton>
                </CouponInputContainer>
                {couponError && <CouponError>{couponError}</CouponError>}
                {appliedCoupon && (
                  <CouponSuccess>
                    ✓ Cupón "{appliedCoupon.coupon.code}" aplicado
                  </CouponSuccess>
                )}
              </CouponContainer>
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
                {shippingCost > 0 && (
                  <CostDetail fontSize='14px'>
                    <span>Envío: </span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </CostDetail>
                )}
                {deliveryType === 'delivery' && itemTotals >= FREE_SHIPPING_THRESHOLD && (
                  <CostDetail fontSize='14px' style={{ color: '#4CAF50' }}>
                    <span>Envío: </span>
                    <span>¡GRATIS!</span>
                  </CostDetail>
                )}
                {appliedCoupon && couponDiscount > 0 && (
                  <CostDetail fontSize='14px' style={{ color: '#58000a' }}>
                    <span>Descuento (cupón): </span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </CostDetail>
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
                  disabled={!wizardComplete}
                  onClick={handlePayment}
                  style={{ opacity: !wizardComplete ? 0.5 : 1, cursor: !wizardComplete ? 'not-allowed' : 'pointer' }}
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