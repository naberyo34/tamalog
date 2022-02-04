---
title: "Next.js + Chakra UI + Storybookの環境構築をした話"
date: "20210912"
tags: ["プログラミング", "Next.js", "Chakra UI", "Storybook"]
---

Next.jsを利用して自主開発アプリ制作を行うため、

- [Chakra UI](https://chakra-ui.com/)
- [Storybook](https://storybook.js.org/)

をNext.js環境に導入したメモ。

## 利用したバージョン

- Next.js 11.1.2
- Chakra UI 1.6.7
- Storybook 6.3.8

## Next.js + TypeScript + ESLint + Prettier環境を作る

`create-next-app` によって一瞬でNext.jsの環境構築ができます。Next.jsのゼロコンフィグに慣れるとReact単体での開発がとても面倒になります……。

```
npx create-next-app project-name
yarn add -D typescript @types/react
```

`pages`配下にある.jsファイルを.ts または .tsxファイルに変更して`yarn dev`を叩くと、なんと`tsconfig.json`の生成まで自動でやってくれます。

基本的な設定は自動生成されたもので十分ですが、私は以下の変更を加えました。

- strict モードにする

```json
"strict": true,
```

- @で絶対パスインポートできるようにする

```json
"baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
```

### ESLint を追加

まずはパッケージを導入します。

```
yarn add -D eslint eslint-config-next
```

導入できたら、`package.json`に以下のスクリプトを追加してコマンドを実行します。

- package.json

```json
"lint": "next lint",
"lint:fix": "next lint --fix",
```

```
yarn lint
```

すると、これまた自動で`.eslintrc.json`が生成されます。コンフィグはNext.js向けにカスタマイズされたルール`eslint-config-next`が採用されているため、必要であれば設定を調整しておくとよいです。

### prettier を追加

ここはいつもどおりの手順でOK。`.eslintrc.json`を編集し、`eslint-config-prettier`が読み込まれるようにしておきましょう。

```
yarn add -D prettier eslint-config-prettier
```

- .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

- 上記の手順は[公式](https://nextjs.org/docs/basic-features/eslint)を参考にした。

## Chakra UI を導入する

Chakra UI は [Emotion](https://emotion.sh/docs/introduction) をベースにしたUIフレームワークで

- Emotionのお作法で[Tailwind CSS](https://tailwindcss.com/)に近いUI設計が可能
- アニメーションライブラリとして[Framer Motion](https://www.framer.com/motion/)をサポートしており、凝った動きも可能

という特徴がある**ようです**。私は使ったことがないので、この機会に学んでいきたいです。

導入方法は他のCSS in JS系ライブラリとほぼ同様で特筆すべき点はありませんが、`app.tsx`のコンポーネントを`ChakraProvider`というコンポーネントで括るのを忘れずに。

公式での解説は[こちら](https://chakra-ui.com/guides/with-nextjs)。

```
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

- pages/app.tsx

```tsx
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }: AppProps) =>  {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
```

## Storybook を導入する

採用するパッケージによって設定が変わるため、少々初期設定が面倒なStorybook。

[Chakra UI公式のGitHub](https://github.com/chakra-ui/chakra-ui/tree/main/.storybook)に参考となるファイルがあるため、こちらをカスタマイズして進めていきます。

- preview.tsx

```tsx
// 余計な記述を削除したのみ
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StoryContext } from '@storybook/react';

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
};

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  return (
    <ChakraProvider theme={extendTheme({ direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
```

- main.js

```js
const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  // Next.jsのディレクトリに合わせて変更
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // addonsはデフォルトで導入済みのものを指定(必要に応じて書き換えてOK)
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    // TypeScriptの項目で行った「絶対パスインポート」をこちらでも有効化する
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
```

## おわりに

本記事では本当にただ導入しただけですが、今後は学習中のAtomic Designと組み合わせてアプリ制作を進めていきたいです。

制作の過程で他にも学びがあったら、別記事でまとめていこうと思います。
