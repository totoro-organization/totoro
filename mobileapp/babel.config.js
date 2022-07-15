module.exports = function (api) {
  api.cache(true);
<<<<<<< HEAD

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: true,
        },
      ],
    ],
=======
  return {
    presets: ["babel-preset-expo"],
    plugins: ["module:react-native-dotenv"],
>>>>>>> webapp
  };
};
