import React from 'react';
import * as styles from './index.module.css';

const Date: React.FC = ({ children }) => (
  <h1 className={styles.text}>{children}</h1>
);

export default Date;
