import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SingleProductButtons, SimpleButton } from "../../UI";
import { bagSizes, grind } from "./singlePageData";
import { API_ENDPOINTS } from  "../../apiConfig"; 

const BackButton = styled.button`
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts[0]};
  &:hover {
    opacity: 0.9;
  }
  @media screen and (min-width: 800px) {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  }
`;

const SingleProductContainer = styled.section`
  width: 90%;
  margin: 1rem auto 5rem auto;
  padding-top: 2rem;
  @media screen and (min-width: 800px) {
    display: flex;
    gap: 2rem;
    min-height: 100vh;
  }
`;

const ProductContainerLeft = styled.div`
  object-fit: cover;
  position: relative;
  @media screen and (min-width: 800px) {
    width: 55%;
    display: flex;
    position: sticky;
    top: 2rem;
    height: fit-content;
    max-height: 600px;
  }
`;

const CoffeeImg = styled.img.attrs((props) => ({
  className: props.className,
}))`
  width: 100%;
  height: 100%;
  max-height: 600px;
  object-fit: contain;
  border-radius: 1rem;
  @media screen and (min-width: 800px) {
    width: 100%;
    height: auto;
    align-self: flex-start;
  }
  &.sticky {
    position: sticky;
    top: 8rem;
    z-index: -10;
    @media screen and (min-width: 800px) {
      position: static;
    }
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: ${props => props.category === 'others' ? '600px' : 'calc(100vh - 4rem)'};
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
  @media screen and (min-width: 800px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  div {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: 600;
    width: 50%;
    font-family: ${({ theme }) => theme.fonts[3]};
    text-align: center;
  }
  button {
    background: ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.white};
    border: none;
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
  text-align: center;
  box-sizing: border-box;
`;

const PriceAndBuyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  background: white;
  padding: 1.5rem 0 1.5rem 0;
  border-top: 2px solid ${({ theme }) => theme.colors.darkerGray};
  z-index: 10;
  box-shadow: 0 -2px 12px 0 rgba(0,0,0,0.07);
  @media screen and (min-width: 800px) {
    padding-right: 2rem;
  }
`;

const PriceDisplay = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts[3]};
  flex: 1;
  text-align: right;
`;

const StyledBuyButton = styled(SimpleButton)`
  @media screen and (min-width: 800px) {
    margin-right: 2rem;
  }
`;

const SinglePage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [stickyClass, setStickyClass] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.GET_PRODUCT_BY_NAME}/${id}`);
        const data = await response.json();

        const isCapsule = data.category === "capsules";
        const firstPresentation = data.presentations[0];

        setProductDetails({
          blendName: data.name,
          singleImg: `${data.secondary_image_url}`,
          description: data.description,
          origin: data.origin,
          roast: data.toasted,
          taste: data.flavors,
          quantity: 1,
          isCapsule,
          category: data.category,
          grams: isCapsule ? null : parseInt(firstPresentation?.weight),
          grind: isCapsule ? null : "Molido",
          price: data.category === "others" 
            ? parseFloat(data.price)
            : isCapsule
              ? parseFloat(data.price)
              : parseFloat(firstPresentation?.price || 0),
          prices: isCapsule || data.category === "others"
            ? {}
            : Object.fromEntries(data.presentations.map(p => [parseInt(p.weight), parseFloat(p.price)])),
        });
      } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
      }
    };

    fetchProductData();
  }, [id]);

  const setGrams = (amount) => {
    setProductDetails((prev) => ({
      ...prev,
      grams: amount,
      price: prev.prices[amount] || prev.price,
    }));
  };

  const setGrind = (grindName) => {
    setProductDetails((prev) => ({ ...prev, grind: grindName }));
  };

  const setQnt = (quantity) => {
    setProductDetails((prev) => ({ ...prev, quantity: Number(quantity) }));
  };

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

  const stickyImgToggle = () => {
    let windowHeight = window.scrollY;
    setStickyClass(windowHeight > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyImgToggle);
    return () => window.removeEventListener("scroll", stickyImgToggle);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productDetails) return <p>Cargando...</p>;

  const totalPrice = (productDetails.price * productDetails.quantity).toFixed(2);

  return (
    <SingleProductContainer>
      <ProductContainerLeft>
        <BackButton onClick={() => navigate(-1)}>
          ← Volver a tienda
        </BackButton>
        <CoffeeImg
          src={productDetails.singleImg}
          alt={productDetails.blendName}
          className={stickyClass ? "sticky" : ""}
        />
      </ProductContainerLeft>

      <ProductContainerRight category={productDetails.category}>
        <h1>{productDetails.blendName}</h1>
        <CraftedSpan>
          {productDetails.isCapsule || productDetails.category === "others" 
            ? "Seleccionado e importado por Carioca"
            : "Producido por Carioca"}
        </CraftedSpan>

        <ProductInfo>
          <p>{productDetails.description}</p>
          {productDetails.category !== 'others' && (
            <>
              <div>
                <span>Tostado:</span>
                {productDetails.roast}
              </div>
              <div>
                <span>Origen:</span> {productDetails.origin}
              </div>
              <div>
                <span>Sabores:</span>
                {productDetails.taste}
              </div>
            </>
          )}
        </ProductInfo>

        <SelectionsContainer category={productDetails.category}>
          {!productDetails.isCapsule && productDetails.category !== 'others' && (
            <Selections>
              <span>Presentaciones:</span>
              <div>
                {bagSizes
                  .filter((bag) => productDetails.prices[bag.amount])
                  .map((bag, index) => (
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

          {!productDetails.isCapsule && productDetails.category !== 'others' && (
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
                  onClick={() => setQnt(Math.max(productDetails.quantity - 1, 1))}
                >
                  -
                </button>
                <QuantityForm
                  type="text"
                  value={productDetails.quantity}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/, "");
                    setQnt(val ? parseInt(val, 10) : 1);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setQnt(productDetails.quantity + 1)}
                >
                  +
                </button>
              </FormContainer>
            </FormContainer>
          </Selections>
        </SelectionsContainer>

        <PriceAndBuyContainer>
          <PriceDisplay>${totalPrice}</PriceDisplay>
          <StyledBuyButton
            bg={(props) => props.theme.colors.darkGray}
            color={(props) => props.theme.colors.white}
            type="button"
            width="200px"
            onClick={addItemToCheckout}
            style={{ marginRight: 0 }}
            className="buy-btn"
          >
            Comprar
          </StyledBuyButton>
        </PriceAndBuyContainer>
      </ProductContainerRight>
    </SingleProductContainer>
  );
};

export default SinglePage;
