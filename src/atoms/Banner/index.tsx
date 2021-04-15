import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Banner: React.FC = () => (
  <StaticImage
    src="../../images/busy_banner.png"
    alt="時間のないサイト運営者リング"
    width={200}
    height={40}
  />
);

export default Banner;
