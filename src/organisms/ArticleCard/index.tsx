import React from 'react';
import { Link } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import Thumbnail from '@/atoms/Thumbnail';
import ArticleInformation from '@/molecules/ArticleInformation';
import Title from '@/atoms/Title';
import Excerpt from '@/atoms/Excerpt';
import * as styles from './index.module.css';

export type Props = {
  img?: string | IGatsbyImageData;
  date: string;
  tags?: readonly GatsbyTypes.Maybe<string>[];
  title: string;
  excerpt: string;
  to: string;
};

const ArticleCard: React.FC<Props> = ({
  img,
  date,
  tags,
  title,
  excerpt,
  to,
}) => {
  // note: Maybe<string>[]をstring[]にType Assertion
  const tagsArray = tags && tags.length > 0 ? (tags as string[]) : [];

  return (
    <div className={styles.wrapper}>
      {img && (
        <Link to={to}>
          <Thumbnail src={img} />
        </Link>
      )}
      <div className={styles.mt10}>
        <ArticleInformation date={date} tags={tagsArray} />
      </div>
      <div className={styles.mt4}>
        <Link to={to}>
          <Title>{title}</Title>
        </Link>
      </div>
      <div className={styles.mt10}>
        <Excerpt>{excerpt}</Excerpt>
      </div>
    </div>
  );
};

export default ArticleCard;
