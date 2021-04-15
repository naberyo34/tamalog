import React from 'react';
import * as styles from './index.module.css';

type Props = {
  label: string;
};

const Tag: React.FC<Props> = ({ label }) => (
  <span className={styles.wrapper}>{label}</span>
);

export default Tag;
