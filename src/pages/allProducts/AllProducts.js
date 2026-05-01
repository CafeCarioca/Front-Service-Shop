import React, { useEffect, useState } from "react";
import { Products } from "../../components";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
import { API_ENDPOINTS } from "../../apiConfig";

const ProductLinks = ({ categories }) => {
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
      {categories.map((cat, i) => (
        <React.Fragment key={cat.slug}>
          {i > 0 && " | "}
          <ScrollLink to={cat.slug} smooth={true} duration={500} offset={-100}>
            {cat.name}
          </ScrollLink>
        </React.Fragment>
      ))}
    </Divs>
  );
};

const CoffeeProducts = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetch(API_ENDPOINTS.GET_CATEGORIES),
          fetch(API_ENDPOINTS.GET_PRODUCT),
        ]);
        const cats = await catsRes.json();
        const products = await prodsRes.json();

        const grouped = {};
        cats.forEach(cat => {
          grouped[cat.slug] = products.filter(p => p.category === cat.slug && p.available);
        });

        setCategories(cats);
        setProductsByCategory(grouped);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando productos...</p>;

  const visibleCategories = categories.filter(cat => (productsByCategory[cat.slug] || []).length > 0);

  return (
    <>
      <ProductLinks categories={visibleCategories} />
      {visibleCategories.map(cat => {
        const prods = productsByCategory[cat.slug] || [];
        return (
          <div key={cat.slug} id={cat.slug}>
            <Products h1={cat.name} p={cat.description || ''} array={prods} />
          </div>
        );
      })}
    </>
  );
};

export default CoffeeProducts;
