import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
};

const Title: React.FC<Props> = ({ label }) => (
  <h1 className={styles.text}>{label}</h1>
);

export default Title;
