import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import ArticleInformation from '@/molecules/ArticleInformation';
import * as styles from './index.module.css';

export type Props = {
  img?: string | IGatsbyImageData;
  date: string;
  tags?: readonly GatsbyTypes.Maybe<string>[];
  title: string;
  excerpt: string;
  to: string;
};

const ArticleCard2: React.FC<Props> = ({
  to,
  title,
  date,
  tags,
  excerpt,
  img,
}) => {
  // note: Maybe<string>[]をstring[]にType Assertion
  const tagsArray = tags && tags.length > 0 ? (tags as string[]) : [];

  return (
    <div className={styles.wrapper}>
      <ArticleInformation
        date={date}
        to={to}
        title={title}
        excerpt={excerpt}
        tags={tagsArray}
      />
      {img && typeof img !== 'string' && (
        <div className={styles.imageWrapper}>
          <GatsbyImage className={styles.image} image={img} alt="" />
        </div>
      )}
    </div>
  );
};

export default ArticleCard2;
