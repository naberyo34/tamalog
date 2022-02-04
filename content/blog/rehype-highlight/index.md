---
title: "rehype-highlightでmarkdownにシンタックスハイライトを適用する"
date: "20210929"
tags: ["プログラミング"]
---

## はじめに

小ネタ記事。[前回](../next-markdown-blog)作成したブログにシンタックスハイライト機能を追加した備忘録です。

## remark-highlight.js について

markdownで記載したコードをシンタックスハイライトして表示する方法を検索すると、[remark-highlight.js](https://github.com/remarkjs/remark-highlight.js?files=1)がよくヒットします。しかし、こちらはREADME記載の通り

> Stability: Legacy. This package is no longer recommended for use.

ということで、現在は[rehype-highlight](https://github.com/rehypejs/rehype-highlight)を使うのが推奨されているようです。

## remark と rehype の違い

そもそもこの`remark`や`rehype`は[Unified](https://unifiedjs.com/)という、文字列を**抽象構文木(AST)**というプログラム上で扱いやすい形式に変換するエコシステムの一部として提供されています。

`remark`はmarkdown、`rehype`はHTMLをASTに相互変換するパッケージです（詳細な解説は[こちら](https://qiita.com/sankentou/items/f8eadb5722f3b39bbbf8)がわかりやすいです）。

## remark と rehypeで変換作業を行う

今回は

- .mdファイルを読み込み、HTMLタグの書かれたプレーンテキストとして出力する

ことが目的のため、ちょっとややこしいですが

- プレーンテキストの形式で.mdファイルを読み込む
- `remark-parse`で.mdファイルをパースし、mdast(markdownのAST)に変換
- `remark-rehype`でmdastをhast(HTMLのAST)に変換
- `rehype-highlight`でhastにシンタックスハイライト用の情報を追加
- `rehype-stringify`でhastをプレーンテキストに戻す(`dangerouslySetInnerHTML`で利用できる形式にする)

という手順を踏めばよいです。

```
yarn add unified remark-parse remark-rehype rehype-highlight rehype-stringify
```

- markdownToHtml.ts

```ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

/**
 * unifiedによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

export default markdownToHtml;
```

こんな感じ。

## highlight.jsのスタイルを読み込む

これでハイライト用のクラスがHTMLに追加されるため、あとはhighlight.jsのCSSを読み込んであげればよいです。

```
yarn add highlight.js
```

- _app.tsx

```ts
import 'highlight.js/styles/default.css';
```
