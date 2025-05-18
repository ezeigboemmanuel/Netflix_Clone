import React from "react";
import Hero from "../components/Hero";
import CardsList from "../components/CardsList";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="p-5">
      <Hero />
      <CardsList title="Now Playing" category="now_playing" />
      <CardsList title="Top Rated" category="top_rated" />
      <CardsList title="Popular" category="popular" />
      <CardsList title="Upcoming" category="upcoming" />
      <Footer />
    </div>
  );
};

export default Homepage;
