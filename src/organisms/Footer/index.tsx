import React from 'react';
import Copyright from '@/atoms/Copyright';
import * as styles from './index.module.css';

const Header: React.FC = () => (
  <footer className={styles.wrapper}>
    <div className={styles.inner}>
      <Copyright />
    </div>
  </footer>
);

export default Header;
