import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Logo: React.FC = () => (
  <h1>
    <StaticImage src="../../images/header_logo.png" alt="tamalog" width={154} />
  </h1>
);

export default Logo;
