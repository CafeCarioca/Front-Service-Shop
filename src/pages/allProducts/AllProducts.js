import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Products } from "../../components";
import { Link as ScrollLink, scroller } from "react-scroll";
import styled from "styled-components";
import { API_ENDPOINTS } from "../../apiConfig";

// Pestañas de categorías: fijas debajo de la barra de navegación (70px) para
// que no se pierdan al scrollear. Definido FUERA del componente para no
// recrear el styled-component en cada render.
const Divs = styled.div`
  position: sticky;
  top: 70px;
  z-index: 9;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1rem;
  margin: 0 0 1.5rem 0;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGray};
  a {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.darkGray};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ProductLinks = ({ categories }) => {
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
  // ?cat=capsules → al terminar de cargar, scrollea a esa categoría (lo usan
  // el link "Cápsulas" del menú y el bloque del Home). Con HashRouter el
  // query vive dentro del hash, por eso se lee de location.search.
  const location = useLocation();
  const targetCat = new URLSearchParams(location.search).get("cat");

  useEffect(() => {
    if (!loading && targetCat) {
      const t = setTimeout(() => {
        scroller.scrollTo(targetCat, { smooth: true, duration: 500, offset: -130 });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [loading, targetCat]);

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
