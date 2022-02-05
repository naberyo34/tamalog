import React from 'react';
import { Link } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import Thumbnail from '@/atoms/Thumbnail';
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
    <div>
      <div className={styles.thumbnail}>
        <Link to={to} title={title}>
          <Thumbnail src={img} />
        </Link>
      </div>
      <div className={styles.information}>
        <ArticleInformation
          date={date}
          to={to}
          title={title}
          excerpt={excerpt}
          tags={tagsArray}
        />
      </div>
    </div>
  );
};

export default ArticleCard;
