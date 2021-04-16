import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
  className?: string;
};

const Date: React.FC<Props> = ({ label, className }) => (
  <span className={className ? `${styles.text} ${className}` : styles.text}>
    {label}
  </span>
);

export default Date;
