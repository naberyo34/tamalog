import React from 'react';
import * as styles from './index.module.css';

type Props = {
  src?: string;
};

const Thumbnail: React.FC<Props> = ({ src }) => {
  if (!src) return <div className={styles.fallback} />;

  return <img className={styles.image} src={src} alt="" />;
};

export default Thumbnail;
