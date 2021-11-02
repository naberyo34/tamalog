import React from 'react';
import logo from '@/images/header_logo.svg';
import * as styles from './index.module.css';

const Logo: React.FC = () => (
  <img
    src={logo}
    alt="tamalog"
    width={154}
    height={35}
    className={styles.image}
  />
);

export default Logo;
