import React from 'react';
import Index from './index';

export default {
  title: 'atoms/Excerpt',
};

export const Default: React.FC = () => (
  <Index label="モジュールを相対パスでimportするのが辛いので、エイリアスを設定した。 ところが、複数の設定を…" />
);
