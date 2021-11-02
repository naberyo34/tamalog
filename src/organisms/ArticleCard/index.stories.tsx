import React from 'react';
import { Story } from '@storybook/react';
import thumbProgramming from '@/images/thumbnail_programming.png';
import Component, { Props } from './index';

export default {
  title: 'organisms/ArticleCard',
};

const Template: Story<Props> = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  img: thumbProgramming,
  date: '2021.05.01',
  tags: ['プログラミング', 'TypeScript', 'Gatsby', 'Storybook'],
  title: 'TypeScript + Gatsby + Storybook環境でimport aliasを利用する',
  excerpt:
    'モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…',
};

export const NoThumbnail = Template.bind({});

NoThumbnail.args = {
  date: '2021.05.01',
  tags: ['プログラミング', 'TypeScript', 'Gatsby', 'Storybook'],
  title: 'TypeScript + Gatsby + Storybook環境でimport aliasを利用する',
  excerpt:
    'モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…',
};
