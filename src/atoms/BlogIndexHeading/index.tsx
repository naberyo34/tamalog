import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
  className?: string;
};

const Date: React.FC<Props> = ({ label, className }) => (
  <h2 className={className ? `${styles.text} ${className}` : styles.text}>
    {label}
  </h2>
);

export default Date;
