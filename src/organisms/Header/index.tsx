import React from 'react';
import { Link } from 'gatsby';
import Logo from '@/atoms/Logo';
import SiteDescription from '@/atoms/SiteDescription';
import * as styles from './index.module.css';

const Header: React.FC = () => (
  <header className={styles.wrapper}>
    <div className={styles.inner}>
      <Link to="/">
        <Logo />
      </Link>
      <SiteDescription>技術記事とか日々の記録とか</SiteDescription>
    </div>
  </header>
);

export default Header;
