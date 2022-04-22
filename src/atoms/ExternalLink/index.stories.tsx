import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'atoms/NavLink',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  to: '/tags/プログラミング',
  children: 'プログラミング',
};
