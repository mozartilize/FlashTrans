var path = require('path');

module.exports = {
  context: path.resolve(__dirname, "app-js"),
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "app-js")],
    extensions: ['.js', '.jsx'],
  },
  entry: {
    home: "./scenes/home/index.jsx",
    signup: "./scenes/signup/index.jsx",
    login: "./scenes/login/index.jsx",
    management_admin_shippers: "./scenes/management/admin/shippers/index.jsx",
    management_admin_rates: "./scenes/management/admin/rates/index.jsx",
    vendors: "./vendors/vendors.js"
  },
  output: {
    path: path.resolve(__dirname, 'app/assets/javascripts'),
    filename: "[name]/index.js",
    publicPath: "app/assets/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "app-js")
        ],
        exclude: /node_modules/,
        options: {
          presets: ["es2015", "react"],
        }
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  devtool: 'source-map'
};
