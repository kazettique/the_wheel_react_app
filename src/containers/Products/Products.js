import React from "react";
import classes from "./Products.module.css";
import ContentPage from "../ContentPage/ContentPage";

const products = props => {
  return (
    <div className={classes.Products}>
      <ContentPage />
    </div>
  );
};

export default products;
