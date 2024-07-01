module.exports = {
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify")
        }
    }
};

    