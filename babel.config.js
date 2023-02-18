module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
