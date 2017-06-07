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
    confirm_success: "./scenes/confirm-success/index.jsx",
    rates: "./scenes/rates/index.jsx",
    services: "./scenes/services/index.jsx",
    management_admin_shippers: "./scenes/management/admin/shippers/index.jsx",
    management_admin_rates: "./scenes/management/admin/rates/index.jsx",
    management_admin_shipments: "./scenes/management/admin/shipments/index.jsx",
    management_shipper_shipments: "./scenes/management/shipper/shipments/index.jsx",
    management_user_orders: "./scenes/management/user/orders/index.jsx",
    vendors: "./vendors/vendors.js"
  },
  output: {
    path: path.resolve(__dirname, 'app/assets/javascripts'),
    filename: "[name]/index.js",
    publicPath: "/app-js/assets/"
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
        loader: ['style-loader', 'css-loader', 'resolve-url-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.png$/,
        loader: "url-loader"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader"
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  },
  devtool: 'source-map'
};
