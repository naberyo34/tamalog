---
title: "Next.jsにEmotionを導入してみる"
date: "20220421"
tags: ["プログラミング", "Next.js", "Emotion"]
---

業務でCSS in JSを利用する際は[styled-components](https://styled-components.com/)を採用することが多かったのですが、CSSを当てるコンポーネントの要素名が変わってしまうため「Reactコンポーネントとして用意されたものなのか、単にスタイルを当てただけなのか」の区別が付きづらく、ちょっとコードの見通しが悪いと感じていました。

[公式](https://styled-components.com/docs/basics#getting-started)から引用↓

```jsx
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

render(
  <Wrapper>
    {/* 「Title.tsx」のようなコンポーネントが別に存在するのかな?という見た目になる…… */}
    <Title>
      Hello World!
    </Title>
  </Wrapper>
)
```

そこで、コンポーネントの名前を変えずに近い使用感で利用できる[Emotion](https://emotion.sh/docs/introduction)を使ってみることにしました。単純に触ってみたかっただけとも言います。

上記のコードをEmotionで書くと、

```jsx
const Title = css`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = css`
  padding: 4em;
  background: papayawhip;
`;

render(
  <div css={Title}>
    <h1 css={Wrapper}>
      Hello World!
    </h1>
    {/* コンポーネントと、スタイルを当てているだけの要素との見分けが付きやすい */}
    <HogeComponent />
  </div>
)
```

このようになります。好みが分かれるかもしれませんが、個人的にはこちらのほうがわかりやすく感じます。

何番煎じかわかりませんが、今回はEmotionを[Next.js](https://nextjs.org/)に導入する際の備忘録です。

## 環境

- Next.js 12.1.5
- Emotion 11.9.0
- TypeScript 4.6.3

## パッケージの導入

`npx create-next-app@latest --ts`でTypeScriptテンプレートをインストールした前提です。

### Emotionをインストール

```
yarn add @emotion/react @emotion/babel-plugin
```

2つ目のbabelプラグインを導入するのは、Emotion固有の書き方である`css prop`に対応させるためです（[公式](https://emotion.sh/docs/css-prop)）。

```jsx
//  こういうの
<h1 css={styles}>hoge<h1>
``

さらに、プロジェクトに`.babelrc`を追加します。Next.js利用時の設定も上記の公式ページに記載してくれています。親切！

- .babelrc

```json
{
  "presets": [
    [
      "@babel/preset-react",
      { "runtime": "automatic", "importSource": "@emotion/react" }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

なお、`create-react-app`を利用している場合などbabelの設定変更ができない環境では、[JSX Pragma(https://emotion.sh/docs/css-prop#jsx-pragma)]を用いて対応できるようです。ただし、毎回独自コメントの記載が必要になるので少々面倒です。

### TypeScript向けに設定

TypeScriptの利用時は`css prop`の型定義がないと怒られてしまうので、追加します。

- .tsconfig.json

```json
{
  "compilerOptions": {
    // 略
    "jsxImportSource": "@emotion/react",
  },
  // 略
}
```

以上で導入は完了です！

## next/link 利用時の注意

[Next.jsの公式](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)に記載がありますが、Emotionの利用時は`next/link`を使う際に`passHref`が必要になります。

また、css propを付与するのは`Link`配下の要素となるため注意しましょう。
毎回書くのは面倒なので、ラップするだけのコンポーネントを作ってあげるとよいと思います。

```jsx
<Link href="/hoge" passHref>
  <a css={hogeStyles}>リンク</a>
</Link>
```

## おわりに

Emotionはまだ使い始めたばかりですが、なかなか使い勝手がいいです。
今後またEmotionに関する内容を記事にするかもしれません！
