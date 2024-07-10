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
const QuantityForm = styled.input`
  padding: 0.5rem;
  width: 100%;
`;
const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  div {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: 600;
    width: 50%;
    font-family: ${({ theme }) => theme.fonts[3]};
  }
`;

const SinglePage = (props) => {
  const { id } = useParams();
  const coffeeList = props.coffeeList;
  const capsulesList = props.capsulesList;

  // Buscar en ambos conjuntos de datos
  const currentCoffee = coffeeList.find((coffee) => coffee.blendName === id) || 
                        capsulesList.find((capsule) => capsule.blendName === id);

  // Proporciona valores predeterminados en caso de que currentCoffee sea undefined
  const defaultDetails = {
    singleImg: "",
    description: "Descripción no disponible",
    blendName: "Nombre no disponible",
    origin: "Origen no disponible",
    roast: "Tostado no disponible",
    taste: "Sabor no disponible",
    price: 0,
  };

  const {
    singleImg,
    description,
    blendName,
    origin,
    roast,
    taste,
    price,
  } = currentCoffee || defaultDetails;

  const [productDetails, setProductDetails] = useState({
    blendName,
    singleImg,
    quantity: 1,
    price,
    grams: 250,
    grind: "Filter",
    isCapsule: capsulesList.some((capsule) => capsule.blendName === id), // Determinar si es cápsula
  });

  useEffect(() => {
    if (currentCoffee) {
      setProductDetails(prevDetails => ({
        ...prevDetails,
        blendName: currentCoffee.blendName,
        singleImg: currentCoffee.singleImg,
        price: currentCoffee.price,
      }));
    }
  }, [currentCoffee]);

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
    setProductDetails({
      ...productDetails,
      grams: amount,
    });
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
                <span>Bag size</span>
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
              <span>Grind</span>
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
                <form>
                  <QuantityForm
                    type="number"
                    min="1"
                    defaultValue="1"
                    onChange={(e) => {
                      let val = e.target.value;
                      if (val === "") {
                        setQnt(1);
                        val = "";
                      }
                      if (val && val !== "") {
                        setQnt(val);
                      }
                    }}
                  />
                </form>
                <div>${price}.00</div>
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