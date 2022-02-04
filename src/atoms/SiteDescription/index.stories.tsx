import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'atoms/SiteDescription',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  children: '技術記事とか日々の記録とか',
};
