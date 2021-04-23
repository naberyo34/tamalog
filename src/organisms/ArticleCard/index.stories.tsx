import React from 'react';
import thumbProgramming from '@/images/thumbnail_programming.png';
import Index from './index';

export default {
  title: 'organisms/ArticleCard',
};

export const Default: React.FC = () => (
  <Index
    img={thumbProgramming}
    date="2021.05.01"
    tags={['プログラミング', 'TypeScript', 'Gatsby', 'Storybook']}
    title="TypeScript + Gatsby + Storybook環境でimport aliasを利用する"
    excerpt="モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…"
    to=""
  />
);

export const NoThumbnail: React.FC = () => (
  <Index
    date="2021.05.01"
    tags={['プログラミング', 'TypeScript', 'Gatsby', 'Storybook']}
    title="TypeScript + Gatsby + Storybook環境でimport aliasを利用する"
    excerpt="モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…"
    to=""
  />
);
