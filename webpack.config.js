const HtmlWebPackPlugin = require("html-webpack-plugin");

// template: value template where looking for my html file. 
// filename: value is the name of the minified html file generated in dist folder

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlPlugin]
};