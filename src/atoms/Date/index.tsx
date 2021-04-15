import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
};

const Date: React.FC<Props> = ({ label }) => (
  <span className={styles.text}>{label}</span>
);

export default Date;
