import React from 'react';
import { Link } from 'gatsby';
import * as styles from './index.module.css';

type Props = {
  to: string;
};

const Tag: React.FC<Props> = ({ to, children }) => (
  <Link to={to}>
    <span className={styles.wrapper}>{children}</span>
  </Link>
);

export default Tag;
