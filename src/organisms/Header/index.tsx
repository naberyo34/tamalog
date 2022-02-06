import React from 'react';
import { Link } from 'gatsby';
import Logo from '@/atoms/Logo';
import SiteDescription from '@/atoms/SiteDescription';
import HeaderNav from '@/molecules/HeaderNav';
import * as styles from './index.module.css';

const Header: React.FC = () => (
  <header className={styles.wrapper}>
    <div className={styles.inner}>
      <div className={styles.heading}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.siteDescription}>
          <SiteDescription>技術記事とか日々の記録とか</SiteDescription>
        </div>
      </div>
      <HeaderNav />
    </div>
  </header>
);

export default Header;
