import React from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import * as styles from './index.module.css';

type Props = {
  url: string;
};

const Title: React.FC<Props> = ({ url }) => (
  <nav className={styles.wrapper}>
    <TwitterShareButton url={url}>
      <TwitterIcon size={40} round />
    </TwitterShareButton>
  </nav>
);

export default Title;
