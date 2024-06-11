import React from "react";
import Coffee from "./Coffee";
import coffeeBlendsData from "./CoffeeData";
import styled from "styled-components";

const CoffeesSelection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 1rem;
`;
const CoffeeSelection = () => {
  return (
    <>
      <CoffeesSelection>
        {coffeeBlendsData
          .map((coffee, index) => {
            const { blendName, listImg, to } = coffee;
            return (
              <Coffee
                blendName={blendName}
                listImg={listImg}
                to={`/collections/coffee-blends/${blendName}`}
                key={index}
              />
            );
          })
          .splice(0, 4)}
      </CoffeesSelection>
    </>
  );
};

export default CoffeeSelection;
