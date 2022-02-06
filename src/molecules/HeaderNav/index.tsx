import React from 'react';
import NavLink from '@/atoms/NavLink';
import * as styles from './index.module.css';

const HeaderNav: React.FC = () => (
  <nav className={styles.wrapper}>
    <NavLink to="/tags/プログラミング">プログラミング</NavLink>
    <NavLink to="/all">すべての記事</NavLink>
  </nav>
);

export default HeaderNav;
