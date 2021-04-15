import React from 'react';
import Index from './index';

export default {
  title: 'organisms/ArticleCard',
};

export const Default: React.FC = () => (
  <Index
    date="2021.05.01"
    tag="技術記事"
    title="TypeScript + Gatsby + Storybook環境でimport aliasを利用する"
    excerpt="モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…"
    to=""
  />
);
