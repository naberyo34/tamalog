---
title: "TypeScript + Gatsby + Storybook環境でimport aliasを利用する"
date: "20210413"
tag: "技術記事"
---

モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。
ところが、複数の設定を変更する必要があり、思った以上に面倒だったので手順をメモ。

# 環境

- TypeScript 4.2.4
- Gatsby 3.2.1
- Storybook 6.2.5
- ESLint 7.24.0
- eslint-plugin-import 2.22.1

# TypeScriptでの有効化

`tsconfig.json`を編集。パッケージのimportと混同しないよう、`@`をaliasとして指定している。

```json
{
  // ...
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
  // ...
}
```

# Gatsbyでの有効化

さらに、Gatsbyの内部で動作しているWebpackの設定変更が必要。`gatsby-node.js`に下記の記述を追加した。

```javascript
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

```

# Storybookでの有効化

Storybookのバンドル設定はプロジェクトとは独立して存在するため、TypeScriptの絶対パスインポートを使う際はStorybook側のconfig`main.js`にも手を加える必要がある。下記のとおり`config.resolve.alias`の設定を追加した。

```javascript
const path = require('path');

module.exports = {
  // ...
  webpackFinal: async (config) => {
    // ...
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
```

# ESLintでの有効化

以上の設定が行われていれば動作はするが、まだ`eslint-plugin-import`の`import/no-unresolved`で怒られる。
今回は`eslint-import-resolver-typescript`を導入し、TypeScriptのalias設定を参照して解決するようにした。
下記のとおり`eslintrc.js`の設定を追加。

```javascript
// ...
settings: {
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project: './tsconfig.json',
    },
  },
}
// ...
```
