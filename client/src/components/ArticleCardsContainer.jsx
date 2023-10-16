import React from 'react'
import styles from './styles/App.module.css'
import ArticleCard from './ArticleCard';

function ArticleCardsContainer(props) {

console.log(props);

    
  return (
    <div className={styles.articles}>
        {props.articles.map(el=> <ArticleCard key={el.title} title={el.title} description = {el.description}/>)}
    </div>
  )
}

export default ArticleCardsContainer;   