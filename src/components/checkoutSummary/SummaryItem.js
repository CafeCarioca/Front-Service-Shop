import React from "react";
import styled from "styled-components";
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
      color: green;
      text-transform: uppercase;
    }
  }
`;
const RemoveListItem = styled.span`
  color: ${({ theme }) => theme.colors.darkRed};
  text-transform: lowercase;
  &:hover {
    color: ${({ theme }) => theme.colors.lightRed};
    cursor: pointer;
  }
`;
const SummaryItem = ({
  blendName,
  singleImg,
  grams,
  grind,
  quantity,
  price,
  checkoutList,
  setCheckoutList,
  id,
}) => {
  let newQuantity;
  if (quantity) newQuantity = quantity;
  if (quantity === "") newQuantity = 1;
  const removeItem = (id) => {
    const itemToRemove = checkoutList.filter((item, index) => {
      return item.id !== id;
    });
    setCheckoutList(itemToRemove);
  };

  return (
    <SummaryItemContainer>
      <SummaryItemLeft>
        <SummaryItemImg src={singleImg} alt={blendName} />
      </SummaryItemLeft>
      <SummaryItemTable>
        <div>
          <span className="greenBold">{blendName}</span>
          <span>
            {grams === 1000 ? "1" : grams}
            {grams === 1000 ? "kg" : "g"} / {grind}
          </span>
        </div>
        <span className="greenBold">${price * quantity}.00</span>
        <span>Qty {quantity}</span>
        <RemoveListItem onClick={() => removeItem(id)}>REMOVE</RemoveListItem>
      </SummaryItemTable>
    </SummaryItemContainer>
  );
};

export default SummaryItem;
