import React from 'react';
import * as styles from './index.module.css';

const Tag: React.FC = ({ children }) => (
  <span className={styles.wrapper}>{children}</span>
);

export default Tag;
