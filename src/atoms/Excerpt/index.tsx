import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
};

const Title: React.FC<Props> = ({ label }) => (
  <p className={styles.text}>{label}</p>
);

export default Title;
