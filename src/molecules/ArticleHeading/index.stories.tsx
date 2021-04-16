import React from 'react';
import Index from './index';

export default {
  title: 'molecules/ArticleHeading',
};

export const Default: React.FC = () => (
  <Index
    date="2021.05.01"
    tags={['プログラミング', 'TypeScript', 'Gatsby', 'Storybook']}
    title="TypeScript + Gatsby + Storybook環境でimport aliasを利用する"
  />
);
