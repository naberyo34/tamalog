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
  tag: string;
  title: string;
  excerpt: string;
  to: string;
};

const ArticleCard: React.FC<Props> = ({
  img,
  date,
  tag,
  title,
  excerpt,
  to,
}) => (
  <div className={styles.wrapper}>
    <Thumbnail src={img} />
    <div className={styles.mt}>
      <ArticleInformation date={date} tag={tag} />
    </div>
    <div className={styles.mt}>
      <Link to={to}>
        <Title label={title} />
      </Link>
    </div>
    <div className={styles.mt}>
      <Excerpt label={excerpt} />
    </div>
  </div>
);

export default ArticleCard;
