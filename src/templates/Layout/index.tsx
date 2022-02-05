import React from 'react';
import Header from '@/organisms/Header';
import Footer from '@/organisms/Footer';
import * as styles from './index.module.css';

const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <main className={styles.wrapper}>
      <div className={styles.inner}>{children}</div>
    </main>
    <Footer />
  </>
);

export default Layout;
