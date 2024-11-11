import React from "react";
import ImageRenderer from "../ImageRenderer/imageRenderer";
import { Link } from "react-router-dom";
import mainBuilding from "../../assets/main_building.jpeg";
import snt from "../../assets/snt.jpeg";
import library from "../../assets/library.jpeg";
import friends from "../../assets/friends.jpeg";
import "../../styles/homepage.css"

export default function Homepage() {
  const images = [mainBuilding, snt, library, friends];

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <ImageRenderer images={images} />
      </section>

      <section className="about-section">
        <h2>About IIEST</h2>
        <p>
          The Indian Institute of Engineering Science and Technology (IIEST),
          Shibpur, is one of the oldest and most prestigious engineering
          institutions in India. Established with a vision to nurture technical
          minds, IIEST has continually contributed to advancements in engineering
          and technology. The institution offers an array of programs that
          empower students with knowledge, innovation, and the skills required to
          succeed in various fields of engineering.
        </p>
      </section>

      <h2>Explore</h2>
      <div className="explore-section">
        <Link to="/faculty" className="explore-link">Faculty</Link>
        <Link to="/alumni" className="explore-link">Alumni</Link>
      </div>
    </div>
  );
}