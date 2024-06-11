import React, { useEffect } from "react";
import { Products, coffeeBlendsData } from "../../components";

const CoffeeProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const h1 = `Coffee`;
  const p = `We craft an array of premium blends to suit any coffee lover's taste.
          When you purchase any of our coffee products, a portion of profits
          goes towards veteran charities and organisations to help veterans move
          forward.`;
  return (
    <>
      <Products h1={h1} p={p} array={coffeeBlendsData}></Products>
    </>
  );
};

export default CoffeeProducts;
