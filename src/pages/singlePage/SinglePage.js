import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { bagSizes, grind } from "./singlePageData";
import styled from "styled-components";
import { SingleProductButtons, SimpleButton } from "../../UI";

const SingleProductContainer = styled.section`
  width: 90%;
  margin: 1rem auto 5rem auto;
  padding-top: 2rem;
  @media screen and (min-width: 800px) {
    display: flex;
    gap: 2rem;
  }
`;
const ProductContainerLeft = styled.div`
  object-fit: cover;
  @media screen and (min-width: 800px) {
    width: 55%;
    display: flex;
  }
`;
const CoffeeImg = styled.img.attrs((props) => ({
  className: props.className,
}))`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  @media screen and (min-width: 800px) {
    min-width: 25rem;
    height: auto;
    align-self: flex-start;
  }
  &.sticky {
    position: sticky;
    top: 8rem;
    z-index: -10;
  }
`;
const ProductContainerRight = styled.div`
  padding: 0 2rem;
  margin-top: 2rem;
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.big};
    margin-bottom: 0.3rem;
  }
  @media screen and (min-width: 800px) {
    width: 45%;
  }
`;
const CraftedSpan = styled.span`
  display: block;
  font-size: small;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 1.5rem;
`;
const ProductInfo = styled.article`
  font-family: ${({ theme }) => theme.fonts[1]};
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  p {
    margin-bottom: 1.5rem;
    line-height: 1.2rem;
  }
  div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkerGray};
    border-left: none;
    border-right: none;
    padding: 1rem 0;
    &:nth-child(2) {
      border-top: 1px solid ${({ theme }) => theme.colors.darkerGray};
    }
    span {
      display: block;
      font-size: ${({ theme }) => theme.fontSizes.small};
      text-transform: uppercase;
      font-family: ${({ theme }) => theme.fonts[0]};
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.darkGray};
    }
  }
`;
const SelectionsContainer = styled.div`
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts[1]};
`;
const Selections = styled.div`
  span {
    text-transform: uppercase;
    margin: 1rem 0;
    display: block;
  }
`;
const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center; // Esto ya alinea los elementos verticalmente
  justify-content: space-between; // Ajusta los elementos dentro del contenedor
  margin-bottom: 1rem;
  div {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: 600;
    width: 50%;
    font-family: ${({ theme }) => theme.fonts[3]};
    text-align: center; // Para centrar el texto dentro de los divs
  }

  button {
    background: ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: 0; // Remueve el padding inferior y añade padding consistente
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-family: ${({ theme }) => theme.fonts[3]};
    &:hover {
      cursor: pointer;
    }
  }
`;

const QuantityForm = styled.input`
  padding: 0.5rem;
  width: 100%;
  text-align: center; // Centra el texto del input
  box-sizing: border-box; // Asegura que el padding no afecte el tamaño total
`;

const SinglePage = (props) => {
  const { id } = useParams();
  const coffeeList = props.coffeeList;
  const capsulesList = props.capsulesList;

  const currentCoffee = coffeeList.find((coffee) => coffee.blendName === id) || 
                        capsulesList.find((capsule) => capsule.blendName === id);

  const defaultDetails = {
    singleImg: "",
    description: "Descripción no disponible",
    blendName: "Nombre no disponible",
    origin: "Origen no disponible",
    roast: "Tostado no disponible",
    taste: "Sabor no disponible",
    prices: {}, // Asegurar que esté definido
  };

  const {
    singleImg,
    description,
    blendName,
    origin,
    roast,
    taste,
    prices = {},
    price, // Asegúrate de que 'prices' esté definido como un objeto vacío si no está presente
  } = currentCoffee || defaultDetails;
  
  const isCapsule = capsulesList.some((capsule) => capsule.blendName === id);
  const initialPrice = isCapsule ? price : (prices[250] || 0);
  
  const [productDetails, setProductDetails] = useState({
    blendName,
    singleImg,
    quantity: 1,
    price: initialPrice, // Usar precio inicial basado en si es cápsula o café
    grams: isCapsule ? null : 250, // No se necesita gramaje para cápsulas
    grind: isCapsule ? null : "Filter", // No se necesita tipo de molienda para cápsulas
    isCapsule,
  });

  useEffect(() => {
    if (currentCoffee) {
      setProductDetails(prevDetails => ({
        ...prevDetails,
        blendName: currentCoffee.blendName,
        singleImg: currentCoffee.singleImg,
        price: isCapsule ? currentCoffee.price : (prices[250] || 0),
      }));
    }
  }, [currentCoffee, isCapsule, prices]);

  const addItemToCheckout = () => {
    const currentCheckoutList = [...props.checkoutList];
    const coffeeAlreadyChosen = currentCheckoutList.find((item) => {
      return (
        item.blendName === productDetails.blendName &&
        item.grind === productDetails.grind &&
        item.grams === productDetails.grams
      );
    });

    if (!coffeeAlreadyChosen) {
      props.setCheckoutList([
        ...props.checkoutList,
        {
          ...productDetails,
          id: Math.random() * 1000,
        },
      ]);
    } else {
      currentCheckoutList.map((item) => {
        if (
          item.blendName === productDetails.blendName &&
          item.grind === productDetails.grind &&
          item.grams === productDetails.grams
        ) {
          return (item.quantity = +item.quantity + +productDetails.quantity);
        }
        return item;
      });
    }
    props.openCheckoutSummary();
  };

  const setGrams = (amount) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      grams: amount,
      price: prices[amount] || prevDetails.price, // Ajusta el precio según el tamaño seleccionado
    }));
  };

  const setGrind = (grindName) => {
    setProductDetails({
      ...productDetails,
      grind: grindName,
    });
  };

  const setQnt = (quantity) => {
    setProductDetails({
      ...productDetails,
      quantity: Number(quantity),
    });
  };

  const [stickyClass, setStickyClass] = useState(false);
  const stickyImgToggle = () => {
    let windowHeight = window.scrollY;
    if (windowHeight > 50) {
      setStickyClass(true);
    } else {
      setStickyClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyImgToggle);
    return () => {
      window.removeEventListener("scroll", stickyImgToggle);
    };
  }, [stickyClass]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = (productDetails.price * productDetails.quantity).toFixed(2);

  return (
    <>
      <SingleProductContainer>
        <ProductContainerLeft>
          <CoffeeImg
            src={singleImg}
            alt={blendName}
            className={stickyClass && "sticky"}
          />
        </ProductContainerLeft>

        <ProductContainerRight>
          <h1>{blendName}</h1>
          <CraftedSpan>Producido por Carioca</CraftedSpan>

          <ProductInfo>
            <p>{description}</p>
            <div>
              <span>Tostado:</span>
              {roast}
            </div>
            <div>
              <span>Origen:</span> {origin}
            </div>
            <div>
              <span>Sabores:</span>
              {taste}
            </div>
          </ProductInfo>
          <SelectionsContainer>
            {!productDetails.isCapsule && (
              <Selections>
                <span>Presentaciones:</span>
                <div>
                  {bagSizes.map((bag, index) => (
                    <SingleProductButtons
                      key={index}
                      className={
                        productDetails.grams === bag.amount ? "clicked" : null
                      }
                      onClick={() => setGrams(bag.amount)}
                    >
                      {bag.size}
                    </SingleProductButtons>
                  ))}
                </div>
              </Selections>
            )}
            {!productDetails.isCapsule && (
            <Selections>
              <span>Tipo de Molienda:</span>
              <div>
                {grind.map((grindName, index) => (
                  <SingleProductButtons
                    key={index}
                    className={
                      productDetails.grind === grindName ? "clicked" : null
                    }
                    onClick={() => setGrind(grindName)}
                  >
                    {grindName}
                  </SingleProductButtons>
                ))}
              </div>
            </Selections>
          )}
            <Selections>
              <span>Cantidad</span>
              <FormContainer>
              <FormContainer>
                <button
                  type="button"
                  onClick={() => setQnt(Math.max(productDetails.quantity - 1, 1))} // Evita que baje de 1
                >
                -
              </button>
              <QuantityForm
                type="text"
                value={productDetails.quantity}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/, ""); // Evita caracteres no numéricos
                  setQnt(val ? parseInt(val, 10) : 1);
                }}
              />
              <button type="button" onClick={() => setQnt(productDetails.quantity + 1)}>
                +
              </button>
              </FormContainer>
            
                <div>${totalPrice}</div> {/* Muestra el precio total */}
              </FormContainer>
            </Selections>
          </SelectionsContainer>

          <SimpleButton
            bg={(props) => props.theme.colors.darkGray}
            color={(props) => props.theme.colors.white}
            type="button"
            width="100%"
            onClick={addItemToCheckout}
          >
            Comprar
          </SimpleButton>
        </ProductContainerRight>
      </SingleProductContainer>
    </>
  );
};

export default SinglePage;