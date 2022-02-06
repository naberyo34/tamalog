import React from 'react';
import { Link } from 'gatsby';
import * as styles from './index.module.css';

type Props = {
  className?: string;
  to: string;
};

const NavLink: React.FC<Props> = ({ className, to, children }) => (
  <Link
    to={to}
    className={className ? `${styles.text} ${className}` : styles.text}
  >
    {children}
  </Link>
);

export default NavLink;
