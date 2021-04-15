import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Logo: React.FC = () => (
  <StaticImage
    src="../../images/header_logo.png"
    alt="tamalog"
    width={154}
    height={36}
  />
);

export default Logo;
