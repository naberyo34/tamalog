import React from 'react';
import * as styles from './index.module.css';

type Props = {
  className?: string;
  isH2?: boolean;
};

const Title: React.FC<Props> = ({ className, isH2, children }) => (
  <>
    {isH2 ? (
      <h2 className={className ? `${styles.text} ${className}` : styles.text}>
        {children}
      </h2>
    ) : (
      <h1 className={className ? `${styles.text} ${className}` : styles.text}>
        {children}
      </h1>
    )}
  </>
);

export default Title;
