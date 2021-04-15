import React from 'react';
import Date from '@/atoms/Date';
import Tag from '@/atoms/Tag';
import * as styles from './index.module.css';

type Props = {
  date: string;
  tag: string;
};

const ArticleInformation: React.FC<Props> = ({ date, tag }) => (
  <div className={styles.wrapper}>
    <Date label={date} />
    <Tag label={tag} />
  </div>
);

export default ArticleInformation;
