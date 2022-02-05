import React from 'react';
import * as styles from './index.module.css';

type Props = {
  className?: string;
};

const Date: React.FC<Props> = ({ className, children }) => (
  <time className={className ? `${styles.text} ${className}` : styles.text}>
    {children}
  </time>
);

export default Date;
