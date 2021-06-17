---
title: "Storybookに再入門したメモ"
date: "20210613"
tags: ["プログラミング", "Storybook"]
---

以前Storybookを実案件で使う機会がたまたまあり、そのときは雰囲気で使い方を習得して乗り切ってしまった。今回はそんなStorybookを今一度学び直してみた。ほぼ[公式チュートリアル](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)の焼き直しのため、自分用のメモである。

## storiesファイルの書き方基礎

導入については特に迷う点がないので割愛する。

```jsx
const Template = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};
```

特徴的な部分があるとすれば`bind({})`で関数のコピーを行った上で、それぞれに渡すpropsの内容を変えているところだ。これによって、コンポーネントが持つpropsによってどのように振る舞いを変えるかをカタログ化することができる。

### デコレータ

```
export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
};
```

デフォルトエクスポートしているオブジェクトの`decorators`にJSXを記載すると、Storybook上で表示する際にコンポーネント本体を`div`でラップするなどの加工ができる。見た目の確認に使うだけでなく、たとえば`react-redux`の`<Provider>`を渡すことも可能だ。

## Storybookをテストに活かす

Storybookは整備されていればそれ単体でも目視でのテストに使えるが、

 - スナップショットテスト
 - ユニットテスト

 用のツールと組み合わせることもできる。前者は[Storyshots](https://github.com/storybookjs/storybook/tree/master/addons/storyshots)、後者は[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)での例が紹介されている(Reactのテストライブラリには[Enzyme](https://enzymejs.github.io/enzyme/)等もある)。

ただしこれだけでは不十分で、リグレッションテスト用のツールとして[chromatic](https://www.chromatic.com/)が紹介されている。これによって、コードだけでなく視覚レベルでdiffを確認するといった作業も半自動で行えるようになる。

## Controls を利用する

Storybookはコンポーネントに渡すpropsを画面下のタブから直接変更することができ、「極端に長い文字列を渡した際の表示崩れチェック」などが手軽にできる。そこでエッジケースとして考慮すべき内容を発見した場合は、その状態を新たなStoryとして追加しておけばよい。

## おわりに

テストに関連する内容はStorybookに限らず経験が浅い部分なので、別の機会に改めて学習を行いたいと感じた。

仮にStorybookを単なるコンポーネントのデザインカタログや動的なパラメータ入力チェックを手動で行うのみの用途で用いた場合でも、導入しない場合に比べて「小さな粒度でのUI実装チェック」が楽になる印象は感じているので、引き続きうまく使っていきたい。
