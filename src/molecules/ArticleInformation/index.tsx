import React from 'react';
import Date from '@/atoms/Date';
import Tag from '@/atoms/Tag';
import * as styles from './index.module.css';

export type Props = {
  date: string;
  tags: string[];
};

const ArticleInformation: React.FC<Props> = ({ date, tags }) => (
  <div>
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
    <div className={styles.mt}>
      <Date>{date}</Date>
    </div>
  </div>
);

export default ArticleInformation;
