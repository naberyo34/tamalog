import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as styles from './index.module.css';

type Props = {
  src?: string | IGatsbyImageData;
};

const Thumbnail: React.FC<Props> = ({ src }) => {
  if (!src) return <div className={styles.fallback} />;

  if (typeof src === 'string')
    return <img className={styles.image} src={src} alt="" />;

  return <GatsbyImage className={styles.image} image={src} alt="" />;
};

export default Thumbnail;
