import React from 'react';
import * as styles from './index.module.css';

const Date: React.FC = ({ children }) => (
  <h2 className={styles.text}>{children}</h2>
);

export default Date;
