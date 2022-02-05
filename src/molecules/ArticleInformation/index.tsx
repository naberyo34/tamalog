import React from 'react';
import { Link } from 'gatsby';
import Title from '@/atoms/Title';
import Date from '@/atoms/Date';
import Excerpt from '@/atoms/Excerpt';
import Tag from '@/atoms/Tag';
import * as styles from './index.module.css';

export type Props = {
  date: string;
  to: string;
  title: string;
  excerpt: string;
  tags: string[] | readonly GatsbyTypes.Maybe<string>[];
};

const ArticleInformation: React.FC<Props> = ({
  to,
  title,
  date,
  tags,
  excerpt,
}) => (
  <div>
    <Date>{date}</Date>
    <Link to={to}>
      <Title className={styles.title}>{title}</Title>
    </Link>
    <Excerpt className={styles.excerpt}>{excerpt}</Excerpt>
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  </div>
);

export default ArticleInformation;
