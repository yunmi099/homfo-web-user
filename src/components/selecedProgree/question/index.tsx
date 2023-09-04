import React, { CSSProperties } from 'react';
import styles from './styles.module.scss';

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div
      className={styles.question}
      dangerouslySetInnerHTML={{ __html: question }}
    ></div>
  );
};

export default Question;