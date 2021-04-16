import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
  className?: string;
};

const Title: React.FC<Props> = ({ label, className }) => (
  <h1 className={className ? `${styles.text} ${className}` : styles.text}>
    {label}
  </h1>
);

export default Title;
