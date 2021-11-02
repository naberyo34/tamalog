import React from 'react';
import { Story } from '@storybook/react';
import Component, { Props } from './index';

export default {
  title: 'organisms/ShareButtons',
};

const Template: Story<Props> = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  url: 'https://example.com/',
};
