
### Description
This project is a sample run through of a bunch of steps to get your feet wet from webpack documentation. 

#### References for README.md
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet


## Steps to get started

### Resources
* https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460
* https://webpack.js.org/concepts/loaders/#loader-features
* https://webpack.js.org/concepts/
* https://babeljs.io/docs/en/babel-preset-env
* https://github.com/babel/babel-loader
* -
* https://medium.com/front-end-hacking/what-are-npm-yarn-babel-and-webpack-and-how-to-properly-use-them-d835a758f987
* https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75


### Webpack
* version 4.20.2
* code: https://github.com/webpack/webpack
* website: https://webpack.js.org/


### Initial Install
* Creates project folder
* Creates package.json -y skipping questions. 
* Webpack added to package.json 
* i:install
* -D:--save-dev
``` javascript
mkdir webpack-react-concepts && cd webpack-react-concepts
npm init -y
npm install webpack webpack-cli --save-dev
```

### Create files

### project
```
 webpack-react-concepts
  |- package.json
+ |- /src
+   |- index.js
```

### Create src fold with index.js 

index.js
``` Javascript
console.log('Amazing src/index.js file')
```



### Add this script to package.json
There is two modes, development and production
package.json
``` Javascript
"scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
  },
```

###  Build the dist/main.js structure. Using defaults 

``` Javascript
npm run start
```

### This will create dist folder with the main.js. Reviewing this file will show the defaults created with no webpack.config.js file. It outputs non-minified webpack built code. Its one single file. 


### Now run this

``` Javascript
npm run build
```


# Setting up React and Babel


### Install *react* and *react-dom*  as  dependency

* -S: --save
* Saves in the dependency object in package.json
``` Javascript
npm i react react-dom -S
```

###  Install babel/core, babel/loader, babel/preset-env babel/preset-react as devDependency

#### Babel v7 Migration: https://babeljs.io/docs/en/v7-migration

``` Javascript

// webpack 4.x | babel-loader 8.x | babel 7.x
npm i  @babel/core babel-loader @babel/preset-env @babel/preset-react -D

// webpack 4.x | babel-loader 7.x | babel 6.x
npm i babel-core babel-loader babel-preset-env babel-preset-react -D
```
#### These are the newer package names. 
* babel/core: Transforms your ES6 code to ES5 for browser compatiblity
* babel/loader: Webpack helper to transform your Javascript dependencies. (importing components into other components) with babel
* babel/preset-env: Determines which transformations/plugins to use and polyfills (Provide modern functionality on older browsers.)
* babel/preset-react: Babel presets for React plugins. (ex: JSX into functions). 

### Create webpack.config.js to state rules of babel-loader. 

#### Documentation: 
* configuration below: https://webpack.js.org/concepts/loaders/#configuration
* **Module.rules** allows you specify loaders with with in webpack configuration. Helps maintain clean code. 
* **rules.test**: This is the types of files your regex -> grepping. 
* **use**: other types: style-loader, css-loader, sass-loader
* **use.options**: This allows you to add options for each loader. options: { modules: true}
* Inline: import Styles from 'style-loader!css-loader?modules!./styles.css';

``` Javascript
module.exports = {
    module: {
        rules: {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
    }
};
```

###  Create .babelrc file 
* File for creating options for babel-loader in webpack.config. 

``` Javascript
nano/touch .bablrc 
// Current way
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

// Prior to v7
{
  "presets": ["env", "react"]
}

```

### Update src/index.js to render as a react component  

``` Javascript

import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello Amazing React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("root"));
```

###  Create src/index.html file. Add contents to it below. This is where we render main react component. 

``` Javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React and Webpack4</title>
</head>
<body>
  <section id="root"></section>
</body>
</html>
```

### Now need to install html-webpack-plugin and use in webpack.config file. This plugin generates an HTML file with `<script>` injected and writes it to the dist/index.html file. This could be useful for loading node.js project from the dist/ folder. its added to devDependency

``` Javascript
npm i html-webpack-plugin -D
```

###  Update webpack.config

``` Javascript
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
```

### Branch for The base setup up above. 
```Javascript 
git branch baseReactWebpackProject
```

# Setting up webpack-dev-server 

###  Install this dev dependency

``` Javascript
npm i webpack-dev-server -D
```
### Update package.json with webpack-dev-server script 
* Changing to webpack-dev-server from webpack in the packag.json/scripts start. 

``` Javascript
"scripts": {
    "start": "webpack-dev-server --mode development --open --hot",  // New Change
     "start": "webpack --mode development", // Prior
  },
```

### Now run `npm run start` 

* You should see **`localhost:8080`** open up in default browser. 
* `--open`: This opens the primary browser. 
* `--hot`: Allows you to reload only component you've changed instead of the full page. 

### Add a clean up script
* NPM Scripts: Tips: https://corgibytes.com/blog/2017/04/18/npm-tips/
``` Javascript
"scripts": {
   "clean": "rm -rf ./node_modules ./package-lock.json ./dist"
  }
```

# Configuring CSS

### Npm install css and style loading for webpack

``` Javascript 
npm i css-loader style-loader -D
```


### Update the webpack.config.js file like below

``` Javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
```

### Notes

* Order of loaders is important
* Need to resolve the CSS files before adding to DOM with style-loader 
* Webpack by default: uses the `loaders` from `right -> left`
* - css-loads 1st followed by style-loader second. css-loader resolves the files.


### Making the CSS modular

* This means the class name wil be scoped locally and specifically to the component. 
* Provide `options` to the css-loader. 

``` Javascript

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};

```
Each loader is an object with a key-value pair.
* modules:true; Enables CSS modules
* importLoaders:Integer; Configures how many loaders before css-loader should be applied. Example: sass-loader would come before css-loader
localIdentName: Configures generated Identification
  - [name] name of component
  - [local] is name of the class/id
  - [hash:base64] randomly generated hash for each components CSS. (Unique module with this ID. )




### Entry and output points

Webpack 4 by default has default entry point of `index.js` in src folder. You can change this default. 

Example
``` javascript
module.exports = {
  entry: "./src/app.js",
  module: {
   ...
  }
}
```

Or

``` javascript
const path = require('path')
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(‘dist’),
    filename: ‘bundled.js’
  },
  module: {
    ...
  }
}
```

###

``` javascript

```


###

``` javascript

```


###

``` javascript

```

###

``` javascript

```

###

``` javascript

```

