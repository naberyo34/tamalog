import React from 'react';
import Date from '@/atoms/Date';
import Tag from '@/atoms/Tag';
import * as styles from './index.module.css';

type Props = {
  date: string;
  tags: string[];
};

const ArticleInformation: React.FC<Props> = ({ date, tags }) => (
  <div>
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          <Tag label={tag} />
        </li>
      ))}
    </ul>
    <div className={styles.mt}>
      <Date label={date} />
    </div>
  </div>
);

export default ArticleInformation;
