import classes from "./Home.module.css";
import React from "react";
import Search from "../Search/Search";
const Home = () => {
  return (
    <div className={classes.container}>
      <Search />
    </div>
  );
};

export default Home;
