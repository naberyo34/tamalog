import React from 'react';
import { Link } from 'gatsby';
import Thumbnail from '@/atoms/Thumbnail';
import ArticleInformation from '@/molecules/ArticleInformation';
import Title from '@/atoms/Title';
import Excerpt from '@/atoms/Excerpt';
import * as styles from './index.module.css';

type Props = {
  img?: string;
  date: string;
  tags: string[];
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
}) => (
  <div className={styles.wrapper}>
    <Link to={to}>
      <Thumbnail src={img} />
    </Link>
    <div className={styles.mt10}>
      <ArticleInformation date={date} tags={tags} />
    </div>
    <div className={styles.mt4}>
      <Link to={to}>
        <Title label={title} />
      </Link>
    </div>
    <div className={styles.mt10}>
      <Excerpt label={excerpt} />
    </div>
  </div>
);

export default ArticleCard;
