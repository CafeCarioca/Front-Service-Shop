import React, { useEffect } from "react";
import {
  Intro,
  FeaturedBlend,
  Coffees,
  Header,
  ReviewsCarousel,
} from "../../components/index";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Intro />
      <FeaturedBlend />
      <Coffees />
      <ReviewsCarousel />
    </>
  );
};

export default Home;
