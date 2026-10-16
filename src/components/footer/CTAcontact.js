import React from "react";
import styled from "styled-components";
import CTAcard from "./CTAcard";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

// Datos de contacto del negocio (pedidos por Carioca business, oct-2026).
const CONTACT = {
  address: "Chaná 2285, 11200 Montevideo",
  addressMapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chan%C3%A1+2285%2C+Montevideo",
  phone: "2408 3704",
  phoneHref: "tel:+59824083704",
  whatsapp: "094 429 464",
  whatsappHref: "https://wa.me/59894429464",
  email: "info@elcarioca.com.uy",
};

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: ${({ theme }) => theme.fonts[1]};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.lightGray};
    svg {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.lightestGray};
    }
    a {
      color: ${({ theme }) => theme.colors.lightestGray};
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.colors.carioca_brickred};
      }
    }
  }
`;

const CTAcontact = () => (
  <CTAcard
    bg={(props) => props.theme.colors.darkGray}
    colorH3={(props) => props.theme.colors.lightestGray}
    color={(props) => props.theme.colors.lightGray}
  >
    <h3>Contacto</h3>
    <p>Estamos en Montevideo. Escribinos o pasá a buscar tu café.</p>
    <ContactList>
      <li>
        <FaMapMarkerAlt />
        <a href={CONTACT.addressMapUrl} target="_blank" rel="noopener noreferrer">
          {CONTACT.address}
        </a>
      </li>
      <li>
        <FaPhoneAlt />
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
      </li>
      <li>
        <FaWhatsapp />
        <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
          WhatsApp {CONTACT.whatsapp}
        </a>
      </li>
      <li>
        <FaEnvelope />
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </li>
    </ContactList>
  </CTAcard>
);

export default CTAcontact;
