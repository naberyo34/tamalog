---
title: "TypeScriptで画像をimportするときの型解決"
date: "20210416"
tags: ["プログラミング", "TypeScript"]
---

TypeScriptで画像ファイルのimportを行うと、型定義が存在しないため怒られる。
調べると型定義ファイルを作成することで解決する方法がヒットするのだが、

```typescript
declare module '*.png';
```

よく見かける上記の書き方だとany型として扱われてしまうため、Lintを導入していると結局`@typescript-eslint/no-unsafe-assignment`等のルールで叱られてしまう。そこで、画像ファイルはstringとして解釈させる方法をとった。

```typescript
declare module '*.png' {
  const image: string;
  export default image;
}
```

これで解決。「imgタグのsrcに指定する」といった目的では今のところ問題は起きていないが、ベストな方法なのかは不明……。TSを使っていると画像やCSS Modulesなどのimportがちょっとだけ手間だ。
