const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/dashboard_main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
              esModule: false,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,
            },
          },
        ],
      },
    ],
  },
};
