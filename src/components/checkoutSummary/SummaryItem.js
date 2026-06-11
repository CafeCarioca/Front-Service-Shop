import React from "react";
import styled from "styled-components";
import { getBogoDiscountAmount, getDiscountLabel } from "../../utils/discounts";
import { optimized, fallbackToOriginal } from "../../utils/imageUrl";
const SummaryItemContainer = styled.article`
  display: flex;

  gap: 1rem;
  margin-bottom: 1rem;
`;
const SummaryItemImg = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 0.5rem;
  object-fit: cover;
`;
const SummaryItemLeft = styled.div`
  width: 30%;
`;

const SummaryItemTable = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: grid;
  grid-template-columns: 70% 30%;
  width: 70%;

  span {
    display: block;
    &.greenBold {
      font-size: 1rem;
      font-weight: 500rem;
      color: black;
      text-transform: uppercase;
    }
  }
`;
const RemoveListItem = styled.span`
  color: ${({ theme }) => theme.colors.darkRed};
  &:hover {
    color: ${({ theme }) => theme.colors.lightRed};
    cursor: pointer;
  }
`;
const PriceContainer = styled.div`
  text-align: right;
`;
const OriginalPrice = styled.span`
  color: #888;
  font-size: 0.85rem;
  text-decoration: line-through;
`;
const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.colors.carioca_brickred || "#58000a"};
  font-weight: 700;
`;
const DiscountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.carioca_brickred || "#58000a"};
  color: white !important;
  display: inline-block !important;
  padding: 0.1rem 0.35rem;
  border-radius: 0.2rem;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 0.25rem;
  width: fit-content;
`;
const SummaryItem = ({
  blendName,
  singleImg,
  grams,
  grind,
  quantity,
  price,
  discount,
  checkoutList,
  setCheckoutList,
  id,
}) => {
  const removeItem = (id) => {
    const itemToRemove = checkoutList.filter((item, index) => {
      return item.id !== id;
    });
    setCheckoutList(itemToRemove);
  };
  const itemOriginalTotal = price * quantity;
  const bogoDiscountAmount = getBogoDiscountAmount({ price, quantity, discount });
  const itemFinalTotal = itemOriginalTotal - bogoDiscountAmount;
  const discountLabel = getDiscountLabel(discount);

  return (
    <SummaryItemContainer>
      <SummaryItemLeft>
        <SummaryItemImg
          src={optimized(singleImg, 160)}
          onError={fallbackToOriginal(singleImg)}
          loading="lazy"
          decoding="async"
          alt={blendName}
        />
      </SummaryItemLeft>
      <SummaryItemTable>
        <div>
          <span className="greenBold">{blendName}</span>
          <span>
            {grams === 1000 ? "1" : grams}
            {grams === 1000 ? "kg" : "g"} / {grind}
          </span>
          {bogoDiscountAmount > 0 && <DiscountBadge>{discountLabel}</DiscountBadge>}
        </div>
        {bogoDiscountAmount > 0 ? (
          <PriceContainer>
            <OriginalPrice>${itemOriginalTotal.toFixed(0)}</OriginalPrice>
            <DiscountedPrice>${itemFinalTotal.toFixed(0)}</DiscountedPrice>
          </PriceContainer>
        ) : (
          <span className="greenBold">${itemOriginalTotal.toFixed(0)}</span>
        )}
        <span>Cantidad: {quantity}</span>
        <RemoveListItem onClick={() => removeItem(id)}>Borrar</RemoveListItem>
      </SummaryItemTable>
    </SummaryItemContainer>
  );
};

export default SummaryItem;
