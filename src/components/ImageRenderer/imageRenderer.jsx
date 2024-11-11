import React, { useState, useEffect } from "react";

const ImageRenderer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
      }, 3000); // Change delay as needed

      return () => clearInterval(interval);
    }
  }, [images]);

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
  };

  const imageStyle = {
    width: "40vw",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      {images.length > 0 && (
        <img
          src={images[currentIndex]}
          alt="college"
          style={imageStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      )}
    </div>
  );
};

export default ImageRenderer;
