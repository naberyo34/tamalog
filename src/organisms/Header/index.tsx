import React from 'react';
import { Link } from 'gatsby';
import Logo from '@/atoms/Logo';
import * as styles from './index.module.css';

const Header: React.FC = () => (
  <header className={styles.wrapper}>
    <div className={styles.inner}>
      <Link to="/">
        <Logo />
      </Link>
    </div>
  </header>
);

export default Header;
