import React, { useState, useEffect } from "react";
import CTAcard from "./CTAcard";
import { SimpleButton } from "../../UI/index";
import styled from "styled-components";
import { API_ENDPOINTS } from "../../apiConfig";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;
const Input = styled.input.attrs((props) => ({ className: props.className }))`
  padding: 0.8rem 1rem;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.mediumGray};
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.secondaryGreen};
    outline: none;
  }
  &.error {
    border: 2px solid ${({ theme }) => theme.colors.lightRed};
    outline: none;
  }
`;
const AlertContainer = styled.div`
  margin-top: 0.5rem;
  font-family: ${({ theme }) => theme.fonts[0]};
`;
const AlertSuccess = styled.div`
  color: ${({ theme }) => theme.colors.secondaryGreen};
`;
const AlertError = styled.div`
  color: ${({ theme }) => theme.colors.lightRed};
`;
const CTAform = () => {
  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  const checkEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

  const formHandler = async (e) => {
    e.preventDefault();

    const email = formContent.trim();
    if (!email || !checkEmail(email)) {
      setFormStatus("error");
      setFormMessage("Ingresa un email valido");
      return;
    }

    setFormStatus("loading");
    setFormMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.SUBSCRIBE_NEWSLETTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "footer" }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "No pudimos registrar tu email");
      }

      setFormStatus("success");
      setFormMessage(data.message || "Registro con exito!");
      setFormContent("");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(error.message || "No pudimos registrar tu email");
    }
  };

  useEffect(() => {
    if (formStatus === "idle" || formStatus === "loading") return undefined;

    const timer = setTimeout(() => {
      setFormStatus("idle");
      setFormMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [formStatus]);

  return (
    <CTAcard bg={(props) => props.theme.colors.lightGray}>
      <h3>REGISTRATE PARA RECIBIR NUESTRAS NOVEDADES</h3>
      <p>
        Se el primero en conocer nuestros nuevos productos, ofertas especiales y
        codigos de descuento exclusivos. No te pierdas ninguna novedad ni
        promocion!
      </p>

      <Form onSubmit={formHandler}>
        <Input
          type="email"
          value={formContent}
          onChange={(e) => setFormContent(e.target.value)}
          className={formStatus === "error" ? "error" : null}
          placeholder="tu@email.com"
          disabled={formStatus === "loading"}
        />
        <SimpleButton
          bg={(props) => props.theme.colors.darkGray}
          color={(props) => props.theme.colors.lightestGray}
          type="submit"
          disabled={formStatus === "loading"}
        >
          {formStatus === "loading" ? "Registrando..." : "Registrarme"}
        </SimpleButton>
      </Form>
      <AlertContainer>
        {formStatus === "success" && <AlertSuccess>{formMessage}</AlertSuccess>}
        {formStatus === "error" && <AlertError>{formMessage}</AlertError>}
      </AlertContainer>
    </CTAcard>
  );
};

export default CTAform;
