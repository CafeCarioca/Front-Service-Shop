import React, { useEffect, useState } from "react";
import { Products } from "../../components";
import { Link as ScrollLink } from "react-scroll"; // ⚠️ Usamos react-scroll, no react-router-dom
import styled from "styled-components";
import { API_ENDPOINTS } from "../../apiConfig"; // ⚠️ Ajustá la ruta si es diferente

const ProductLinks = () => {
  const Divs = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    a {
      font-size: ${({ theme }) => theme.fontSizes.small};
      color: ${({ theme }) => theme.colors.darkGray};
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  `;
  return (
    <Divs>
      <ScrollLink to="coffee" smooth={true} duration={500} offset={-100}>Café</ScrollLink> | 
      <ScrollLink to="capsules" smooth={true} duration={500} offset={-100}>Capsulas</ScrollLink>
    </Divs>
  );
};

const CoffeeProducts = () => {
  const [coffeeBlendsData, setCoffeeBlendsData] = useState([]);
  const [capsulesData, setCapsulesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.GET_PRODUCT);
        const data = await res.json();

        const coffee = data.filter(p => p.category === "coffee");
        const capsules = data.filter(p => p.category === "capsules");

        setCoffeeBlendsData(coffee);
        setCapsulesData(capsules);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const h1 = `CAFE`;
  const p = `Nuestro café, tu tradición.
Desde 1916, Carioca ha llevado el arte del café a tu mesa con mezclas únicas y cuidadosamente elaboradas. Disfruta de la calidad y el sabor que nos caracteriza en cada grano.`;

  const capsulastitle = `Capsulas`;
  const pcapsules = `Seleccionamos una variedad de cápsulas premium diseñadas para satisfacer los paladares más exigentes. En Carioca nos apasiona llevar calidad y tradición a tu taza.`;

  return (
    <>
      <ProductLinks />

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      ) : (
        <>
          <div id="coffee">
            <Products h1={h1} p={p} array={coffeeBlendsData} />
          </div>
          <div id="capsules">
            <Products h1={capsulastitle} p={pcapsules} array={capsulesData} />
          </div>
        </>
      )}
    </>
  );
};

export default CoffeeProducts;
