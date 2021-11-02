import React from 'react';
import { Story } from '@storybook/react';
import Component from './index';

export default {
  title: 'atoms/Excerpt',
};

const Template: Story = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  children:
    'モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…',
};
