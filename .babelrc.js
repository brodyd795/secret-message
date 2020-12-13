const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
    presets: [
      ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
      '@babel/preset-react',
      "next/babel"
    ],
    plugins: ['@babel/plugin-transform-runtime', ["styled-components", { "ssr": true }]],
  };
  