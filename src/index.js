
// 1
// console.log('Amazing src/index.js file');

// 2
import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.css";


const Index = () => {
  return <div className={styles.primaryColor}>Hello Amazing React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("root"));