import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'atoms/BlogIndexHeading',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '新着記事',
};
