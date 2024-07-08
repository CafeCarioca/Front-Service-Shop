import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SinglePage, CoffeeProducts, AboutUs, Checkout } from "./pages";
import {
  Navbar,
  Footer,
  coffeeBlendsData,
  CheckoutSummary,
  SideNav,
} from "./components";
import { Theme, GlobalStyle } from "./UI";

function App() {
  const coffeeList = coffeeBlendsData;
  const checkoutListData =
    JSON.parse(localStorage.getItem("checkoutList")) || [];
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutList, setCheckoutList] = useState(checkoutListData);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const openCheckoutSummary = () => {
    setCheckingOut(true);
  };

  const closeCheckoutSummary = () => {
    setCheckingOut(false);
  };

  const openSideNav = () => {
    setIsSideNavOpen(true);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
  }, [checkoutList]);

  return (
    <>
      <Theme>
        <GlobalStyle />
        <BrowserRouter basename="/Front-Service-Shop">
          {checkingOut && (
            <CheckoutSummary
              closeCheckoutSummary={closeCheckoutSummary}
              setCheckoutList={setCheckoutList}
              checkoutList={checkoutList}
            />
          )}
          {isSideNavOpen && <SideNav closeSideNav={closeSideNav} />}
          <Navbar
            openCheckoutSummary={openCheckoutSummary}
            checkoutList={checkoutList}
            openSideNav={openSideNav}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route
              path="check-out"
              element={<Checkout checkoutList={checkoutList} />}
            />
            <Route
              path="/collections/coffee-blends/"
              element={<CoffeeProducts />}
            />
            <Route
              path="/collections/coffee-blends/:id"
              element={
                <SinglePage
                  coffeeList={coffeeList}
                  openCheckoutSummary={openCheckoutSummary}
                  checkoutList={checkoutList}
                  setCheckoutList={setCheckoutList}
                />
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Theme>
    </>
  );
}

export default App;