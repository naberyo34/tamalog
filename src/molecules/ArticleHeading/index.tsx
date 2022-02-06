import React from 'react';
import Date from '@/atoms/Date';
import Tag from '@/atoms/Tag';
import Title from '@/atoms/Title';
import * as styles from './index.module.css';

export type Props = {
  date: string;
  tags?: readonly GatsbyTypes.Maybe<string>[];
  title: string;
};

const ArticleHeading: React.FC<Props> = ({ date, tags, title }) => {
  // note: Maybe<string>[]をstring[]にType Assertion
  const tagsArray = tags && tags.length > 0 ? (tags as string[]) : [];

  return (
    <>
      <div className={styles.information}>
        <Date className={styles.date}>{date}</Date>
        <ul className={styles.tags}>
          {tagsArray.map((tag) => (
            <li key={tag} className={styles.tag}>
              <Tag to={`/tags/${tag}`}>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <Title className={styles.title}>{title}</Title>
    </>
  );
};

export default ArticleHeading;
