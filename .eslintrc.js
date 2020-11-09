module.exports = {
  env: {
    browser: true,
    jasmine: true
  },
  extends: ["eslint:recommended", "airbnb"],
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    indent: 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'comma-dangle': ['error', 'never'],
    'no-shadow': 'off',
    'react/no-children-prop': 'off',
    "import/prefer-default-export": "off",
    "linebreak-style":  "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-underscore-dangle": 0,
    "react/prop-types": 0,
    "semi": 0,
    "import/no-cycle": ["error", { "maxDepth": Infinity }]
  }
};