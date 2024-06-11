import React, { useEffect } from "react";
import {
  Navbar,
  Intro,
  FeaturedBlend,
  Coffees,
  HelpingVets,
  Footer,
} from "../../components/index";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Intro />
      <FeaturedBlend />
      <Coffees />
    </>
  );
};

export default Home;
