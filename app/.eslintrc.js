module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  semi: false,
  rules: {
    'react-native/no-inline-styles': 0,
    semi: [0, 'never'],
  },
}
