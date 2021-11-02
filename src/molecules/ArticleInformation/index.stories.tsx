import React from 'react';
import { Story } from '@storybook/react';
import Component, { Props } from './index';

export default {
  title: 'molecules/ArticleInformation',
};

const Template: Story<Props> = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  date: '2021.05.01',
  tags: ['プログラミング', 'TypeScript', 'Gatsby', 'Storybook'],
};
