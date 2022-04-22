import React from 'react';
import * as styles from './index.module.css';

type Props = {
  className?: string;
  to: string;
};

const ExternalLink: React.FC<Props> = ({ className, to, children }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className={className ? `${styles.text} ${className}` : styles.text}
  >
    {children}
  </a>
);

export default ExternalLink;
