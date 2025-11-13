import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SinglePage, CoffeeProducts, AboutUs, Checkout, ThankYou, Failure } from "./pages";
// Search feature disabled - do not commit
// import SearchResults from "./pages/searchResults/SearchResults";
import {
  Navbar,
  Footer,
  coffeeBlendsData,
  CapsulesData,
  CheckoutSummary,
  SideNav,
} from "./components";
import { Theme, GlobalStyle } from "./UI";

function App() {
  const coffeeList = coffeeBlendsData;
  const capsulesList = CapsulesData;
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
        <Router>
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
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="pay-failure" element={<Failure />} />
            {/* Search feature disabled - do not commit */}
            {/* <Route path="/search" element={<SearchResults />} /> */}

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
                  capsulesList={capsulesList}
                  openCheckoutSummary={openCheckoutSummary}
                  checkoutList={checkoutList}
                  setCheckoutList={setCheckoutList}
                />
              }
            />
          </Routes>
          <Footer />
        </Router>
      </Theme>
    </>
  );
}

export default App;
