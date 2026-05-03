export const parsePrice = (value) => {
  const price = Number.parseFloat(value);
  return Number.isFinite(price) ? price : null;
};

export const formatPrice = (value) => {
  const price = parsePrice(value);
  return price === null ? "" : `$${price.toFixed(0)}`;
};

export const calculateDiscountedPrice = (originalPrice, discount) => {
  const price = parsePrice(originalPrice);
  const discountValue = parsePrice(discount?.value);

  if (price === null || discountValue === null) return price;

  if (discount.type === "percentage") {
    return price * (1 - discountValue / 100);
  }

  if (discount.type === "fixed_amount") {
    return Math.max(0, price - discountValue);
  }

  return price;
};

export const getProductBasePrice = (product) => {
  if (!product) return null;

  const presentationPrices = (product.presentations || [])
    .map((presentation) => parsePrice(presentation.price))
    .filter((price) => price !== null);

  if (
    product.category !== "capsules" &&
    product.category !== "others" &&
    presentationPrices.length > 0
  ) {
    return Math.min(...presentationPrices);
  }

  return parsePrice(product.price) ?? presentationPrices[0] ?? null;
};

export const getProductPriceInfo = (product) => {
  const originalPrice = getProductBasePrice(product);
  const hasDiscount = Boolean(product?.has_discount && product?.discount && originalPrice !== null);
  const discountedPrice = hasDiscount
    ? calculateDiscountedPrice(originalPrice, product.discount)
    : originalPrice;

  return {
    originalPrice,
    discountedPrice,
    hasDiscount,
    showFromLabel:
      product?.category !== "capsules" &&
      product?.category !== "others" &&
      (product?.presentations || []).length > 1,
  };
};

export const getDiscountLabel = (discount) => {
  const value = parsePrice(discount?.value);
  if (!discount || value === null) return null;

  if (discount.type === "percentage") {
    return `-${value.toFixed(0)}%`;
  }

  if (discount.type === "fixed_amount") {
    return `-${formatPrice(value)}`;
  }

  return null;
};
