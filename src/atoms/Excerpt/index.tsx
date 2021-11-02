import React from 'react';
import * as styles from './index.module.css';

const Title: React.FC = ({ children }) => (
  <p className={styles.text}>{children}</p>
);

export default Title;
