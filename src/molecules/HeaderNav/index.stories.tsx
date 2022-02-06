import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'molecules/HeaderNav',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  to: '/tags/プログラミング',
  children: 'プログラミング',
};
