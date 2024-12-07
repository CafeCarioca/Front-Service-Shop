import React, { useEffect } from "react";
import { Products, coffeeBlendsData, CapsulesData} from "../../components";
import { Link } from "react-scroll";
import styled from "styled-components";

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
      <Link to="coffee" smooth={true} duration={500} offset={-100}>Café</Link> | 
      <Link to="capsules" smooth={true} duration={500} offset={-100}>Capsulas</Link> | 
      {/* <Link to="methods" smooth={true} duration={500} offset={-100}>Metodos</Link> */}
    </Divs>
  );
};

const CoffeeProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const h1 = `CAFE`;
  const p = `Nuestro café, tu tradición.
Desde 1916, Carioca ha llevado el arte del café a tu mesa con mezclas únicas y cuidadosamente elaboradas. Disfruta de la calidad y el sabor que nos caracteriza en cada grano.`;
  const capsulastitle = `Capsulas`;
  const pcapsules = `Seleccionamos una variedad de cápsulas premium diseñadas para satisfacer los paladares más exigentes. En Carioca nos apasiona llevar calidad y tradición a tu taza.`;
  const methods = "Metodos de preparacion";
  const pmethods = `We craft an array of premium blends to suit any coffee lover's taste.
          When you purchase any of our coffee products, a portion of profits
          goes towards veteran charities and organisations to help veterans move
          forward.`;

  return (
    <>
      <ProductLinks />
      <div id="coffee">
        <Products h1={h1} p={p} array={coffeeBlendsData}></Products>
      </div>
      <div id="capsules">
        <Products h1={capsulastitle} p={pcapsules} array={CapsulesData}></Products>
      </div>
      {/* <div id="methods">
        <Products h1={methods} p={pmethods} array={coffeeBlendsData}></Products>
      </div> */}
    </>
  );
};

export default CoffeeProducts;