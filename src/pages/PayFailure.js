import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FailureContainer = styled.div`
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
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts[0]};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.75rem;

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
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts[1]};

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    font-size: 1.1rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    font-size: 1.2rem;
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

const PaymentFailure = () => {
  return (
    <FailureContainer>
      <H1>Lo sentimos, algo salió mal</H1>
      <P>Hubo un problema con tu compra. Por favor, inténtalo de nuevo más tarde.</P>
      <Button to="/">Volver a la página principal</Button>
    </FailureContainer>
  );
};

export default PaymentFailure;