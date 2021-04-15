import React from 'react';
import Copyright from '@/atoms/Copyright';
import Banner from '@/atoms/Banner';
import * as styles from './index.module.css';

const Header: React.FC = () => (
  <footer className={styles.wrapper}>
    <div className={styles.inner}>
      <Copyright />
      <a
        href="https://sites.google.com/site/happybusy/"
        target="_blank"
        rel="noreferrer"
        className={styles.banner}
      >
        <Banner />
      </a>
    </div>
  </footer>
);

export default Header;
