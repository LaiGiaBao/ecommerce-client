import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/carousel-layout.css";
const CarouselLayout = (children) => {
  return (
    <Carousel className="mx-auto carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://media.istockphoto.com/photos/elegant-black-leather-shoes-picture-id172417586?k=20&m=172417586&s=612x612&w=0&h=DDjvQhRgSYcH2F5rVt8iohGvkqCIteYuTCq3wpJuUi4="}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://images.squarespace-cdn.com/content/v1/52d654d2e4b0a3af71bf6bcc/1627659581969-5EA7H241G2YETQFQFGF9/SIF+1948+white+dial?format=1000w"}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://img.freepik.com/free-photo/men-s-clothing-set-with-oxford-shoes-watch-sunglasses-office-shirt-tie-jacket-isolated-white-background-top-view_107612-73.jpg"}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};
export default CarouselLayout;
