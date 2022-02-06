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
}) => {
  // note: Maybe<string>[]をstring[]にType Assertion
  const tagsArray = tags && tags.length > 0 ? (tags as string[]) : [];

  return (
    <div>
      <Date>{date}</Date>
      <Link to={to}>
        <Title className={styles.title} isH2>
          {title}
        </Title>
      </Link>
      <Excerpt className={styles.excerpt}>{excerpt}</Excerpt>
      <ul className={styles.tags}>
        {tagsArray.map((tag) => (
          <li key={tag} className={styles.tag}>
            <Tag to={`/tags/${tag}`}>{tag}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleInformation;
