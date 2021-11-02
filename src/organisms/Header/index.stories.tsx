import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'organisms/Header',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});
