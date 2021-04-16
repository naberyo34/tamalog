import React from 'react';
import Date from '@/atoms/Date';
import Tag from '@/atoms/Tag';
import Title from '@/atoms/Title';
import * as styles from './index.module.css';

type Props = {
  date: string;
  tags: string[];
  title: string;
};

const ArticleHeading: React.FC<Props> = ({ date, tags, title }) => (
  <>
    <div className={styles.information}>
      <Date label={date} className={styles.date} />
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            <Tag label={tag} />
          </li>
        ))}
      </ul>
    </div>
    <Title label={title} className={styles.title} />
  </>
);

export default ArticleHeading;
