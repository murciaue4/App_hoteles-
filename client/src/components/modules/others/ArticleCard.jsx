import React from 'react';
import styles from './styles/App.module.css'
const ArticleCard = ({title, description}) => {
    
  return (
    <div  className={styles.article_card + ' m-8 '}>
        
      <h1>{title}</h1><br />
      <article >
      <p>{description}.</p>
     
      </article>
      
    </div>
  );
};

export default ArticleCard;