import React, { useState, useEffect } from "react";
import axios from "axios";
import Coffee from "./Coffee";
import styled from "styled-components";
import { API_ENDPOINTS } from "../../apiConfig";

const CoffeesSelection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: nowrap;
  
  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    overflow: auto;
    white-space: nowrap;
    padding-bottom: 1rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const CoffeeSelection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from:", API_ENDPOINTS.GET_PRODUCT);
        const response = await axios.get(API_ENDPOINTS.GET_PRODUCT);
        console.log("Products received:", response.data);
        
        // Filtrar solo los productos de café (category: 'coffee') y limitar a 5
        const coffeeProducts = response.data
          .filter(product => product.category === 'coffee')
          .slice(0, 5);
        
        console.log("Filtered coffee products:", coffeeProducts);
        setProducts(coffeeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        console.error("Error details:", error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingMessage>Cargando productos...</LoadingMessage>;
  }

  if (products.length === 0) {
    return <LoadingMessage>No se encontraron productos de café.</LoadingMessage>;
  }

  return (
    <>
      <CoffeesSelection>
        {products.map((product, index) => {
          const { name, image_url } = product;
          console.log("Rendering product:", name, "Image:", image_url);
          return (
            <Coffee
              blendName={name}
              listImg={image_url}
              to={`/collections/coffee-blends/${name}`}
              key={index}
            />
          );
        })}
      </CoffeesSelection>
    </>
  );
};

export default CoffeeSelection;
