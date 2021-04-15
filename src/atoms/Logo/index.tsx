import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Logo: React.FC = () => (
  <>
    <StaticImage
      src="../../images/header_logo.png"
      alt="tamalog"
      width={154}
      height={36}
      layout="fixed"
      className="pc"
    />
    <StaticImage
      src="../../images/header_logoSp.png"
      alt="tamalog"
      width={103}
      height={24}
      layout="fixed"
      className="sp"
    />
  </>
);

export default Logo;
