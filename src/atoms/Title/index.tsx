import React from 'react';
import * as styles from './index.module.css';

type Props = {
  className?: string;
};

const Title: React.FC<Props> = ({ className, children }) => (
  <h1 className={className ? `${styles.text} ${className}` : styles.text}>
    {children}
  </h1>
);

export default Title;
