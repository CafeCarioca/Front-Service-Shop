export const isDiscountValidForDelivery = (discount, deliveryType) => {
  if (!discount) return false;
  if (!deliveryType) return true;
  const discountDeliveryType = discount.delivery_type || "both";
  return discountDeliveryType === "both" || discountDeliveryType === deliveryType;
};

export const getBogoDiscountAmount = (item, deliveryType) => {
  if (!item?.discount || item.discount.type !== "bogo") return 0;
  if (!isDiscountValidForDelivery(item.discount, deliveryType)) return 0;

  const quantity = Number(item.quantity) || 0;
  const unitPrice = Number(item.price) || 0;
  return Math.floor(quantity / 2) * unitPrice;
};

export const getDiscountLabel = (discount) => {
  if (!discount) return null;
  if (discount.type === "bogo") return "2x1";
  if (discount.type === "percentage") return `-${Number(discount.value).toFixed(0)}%`;
  if (discount.type === "fixed_amount") return `-$${Number(discount.value).toFixed(0)}`;
  return null;
};
