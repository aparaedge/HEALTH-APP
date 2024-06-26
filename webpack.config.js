module.exports = {
    // ...
    resolve: {
        fallback: {
          util: require.resolve("util/"),
        }
    },
    resolve: {
        fallback: { "crypto": require.resolve("crypto-browserify") }
    }
    // ...
  };