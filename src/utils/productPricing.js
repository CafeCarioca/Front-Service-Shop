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

  if (discount.type === "bogo") {
    return price;
  }

  return price;
};

export const weightToGrams = (weight) => {
  const text = String(weight ?? "").trim().toLowerCase();
  const value = Number.parseFloat(text);
  if (!Number.isFinite(value)) return null;
  return text.includes("kg") ? Math.round(value * 1000) : Math.round(value);
};

export const discountAppliesToPresentation = (discount, grams) => {
  const weights = discount?.presentation_weights || [];
  if (weights.length === 0) return true;
  const rawGrams = Number(grams);
  const selectedGrams = rawGrams > 0 && rawGrams < 10 ? rawGrams * 1000 : rawGrams;
  return weights.some((weight) => weightToGrams(weight) === selectedGrams);
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
  const presentations = product?.presentations || [];
  const restricted = (product?.discount?.presentation_weights || []).length > 0;
  const pricedPresentations = presentations.map((presentation) => {
    const original = parsePrice(presentation.price);
    const eligible = product?.has_discount && discountAppliesToPresentation(
      product.discount,
      weightToGrams(presentation.weight)
    );
    return {
      original,
      final: eligible ? calculateDiscountedPrice(original, product.discount) : original,
      eligible,
    };
  }).filter(item => item.original !== null);

  const basePrice = getProductBasePrice(product);
  const cheapest = pricedPresentations.length > 0
    ? pricedPresentations.reduce((best, item) => item.final < best.final ? item : best)
    : basePrice !== null
      ? {
          // Producto sin presentaciones (cápsulas / otros): el precio base es la
          // única "presentación". Antes esto quedaba en null y el precio
          // rebajado nunca se mostraba aunque el badge de descuento sí.
          original: basePrice,
          final: product?.has_discount && !restricted
            ? calculateDiscountedPrice(basePrice, product.discount)
            : basePrice,
          eligible: Boolean(product?.has_discount && !restricted),
        }
      : null;
  const originalPrice = cheapest?.original ?? basePrice;
  const hasDiscount = Boolean(
    product?.has_discount && product?.discount && originalPrice !== null &&
    (!restricted || pricedPresentations.some(item => item.eligible))
  );
  const showPriceDiscount = Boolean(cheapest?.eligible && product.discount?.type !== "bogo");
  const discountedPrice = showPriceDiscount ? cheapest.final : originalPrice;

  return {
    originalPrice,
    discountedPrice,
    hasDiscount,
    showPriceDiscount,
    showFromLabel:
      product?.category !== "capsules" &&
      product?.category !== "others" &&
      (product?.presentations || []).length > 1,
  };
};

export const getDiscountLabel = (discount) => {
  if (!discount) return null;

  if (discount.type === "bogo") {
    return "2x1";
  }

  const value = parsePrice(discount?.value);
  if (value === null) return null;

  if (discount.type === "percentage") {
    return `-${value.toFixed(0)}%`;
  }

  if (discount.type === "fixed_amount") {
    return `-${formatPrice(value)}`;
  }

  return null;
};
