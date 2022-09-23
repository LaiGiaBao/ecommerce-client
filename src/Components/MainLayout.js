import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import CarouselLayout from "./CarouselLayout";
const MainLayout = (props) => {
  return (
    <div className="App">
      {/* <NavBarComp /> */}
      <CarouselLayout />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
