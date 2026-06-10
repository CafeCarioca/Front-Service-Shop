import React, { useState, useEffect, lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
// Search feature disabled - do not commit
// import SearchResults from "./pages/searchResults/SearchResults";
import {
  Navbar,
  Footer,
  CheckoutSummary,
  SideNav,
} from "./components";
import { Theme, GlobalStyle } from "./UI";
import ChunkErrorBoundary from "./components/ChunkErrorBoundary";

// Code splitting por ruta: cada página descarga su JS recién cuando se navega a ella.
// La Home queda eager porque es la entrada principal.
const SinglePage = lazy(() => import("./pages/singlePage/SinglePage"));
const CoffeeProducts = lazy(() => import("./pages/allProducts/AllProducts"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Failure = lazy(() => import("./pages/PayFailure"));

function App() {
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
          <ChunkErrorBoundary>
          <Suspense fallback={null}>
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
                  openCheckoutSummary={openCheckoutSummary}
                  checkoutList={checkoutList}
                  setCheckoutList={setCheckoutList}
                />
              }
            />
          </Routes>
          </Suspense>
          </ChunkErrorBoundary>
          <Footer />
        </Router>
      </Theme>
    </>
  );
}

export default App;
