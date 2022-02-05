import React from 'react';
import {
  TwitterShareButton,
  TwitterIcon,
  HatenaShareButton,
  HatenaIcon,
  FacebookShareButton,
  FacebookIcon,
  PocketShareButton,
  PocketIcon,
} from 'react-share';
import * as styles from './index.module.css';

export type Props = {
  url: string;
};

const Title: React.FC<Props> = ({ url }) => (
  <nav className={styles.wrapper}>
    <TwitterShareButton url={url}>
      <TwitterIcon size={40} round />
    </TwitterShareButton>
    <HatenaShareButton url={url}>
      <HatenaIcon size={40} round />
    </HatenaShareButton>
    <FacebookShareButton url={url}>
      <FacebookIcon size={40} round />
    </FacebookShareButton>
    <PocketShareButton url={url}>
      <PocketIcon size={40} round />
    </PocketShareButton>
  </nav>
);

export default Title;
