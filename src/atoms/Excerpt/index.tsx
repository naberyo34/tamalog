import React from 'react';
import * as styles from './index.module.css';

type Props = {
  className?: string;
};

const Title: React.FC<Props> = ({ className, children }) => (
  <p className={className ? `${styles.text} ${className}` : styles.text}>
    {children}
  </p>
);

export default Title;
