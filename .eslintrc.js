module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
  root: true,
  rules: {
    // Reactのimport時にエラーが出る問題の対策
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // 1行のときはclassのメンバ変数間に改行がなくても許可する
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    // hooksのコードを書くときにバッティングする(らしい)
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    // return の前には必ず空行を入れる
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    // _を先頭につけたときだけ未使用変数の定義を許可する
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '_',
        ignoreRestSiblings: false,
        varsIgnorePattern: '_',
      },
    ],
    // js / tsをimportするときだけ拡張子省略を有効にする
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // JSXファイルの拡張子で.tsxも有効にする
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
  },
  // TSのときだけprop-typesを使わなくてもよくする
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  // 絶対パスインポートをESLint側でも有効化する
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
