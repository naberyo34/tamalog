import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'atoms/Title',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  children: 'TypeScript + Gatsby + Storybook環境でimport aliasを利用する',
};
