import React from "react";
import style from './styles/App.module.css'
import Nav from './Nav';
import ArticleCard from "./ArticleCard";
import Cartelera from "./Cartelera";
import Footer from "./Footer";
import ArticleCardsContainer from "./ArticleCardsContainer";


function App() {
  const articles = [
    {
      title: 'Bolsa de trabajo',
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique assumenda sunt tenetur, aut rem praesentium suscipit corporis.'
    },
    {
      title: 'Servicios',
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique assumenda sunt tenetur, aut rem praesentium suscipit corporis.'
    },
    {
      title: 'Comunidad',
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique assumenda sunt tenetur, aut rem praesentium suscipit corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique assumenda sunt tenetur, aut rem praesentium suscipit corporis.'
    },
    // {
    //   title: '¿Quiere apoyarnos?',
    //   description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique assumenda sunt tenetur, aut rem praesentium suscipit corporis.'
    // }
  ]
  return (
   <div className={style.App}>
    <Nav/>
    <Cartelera/>
    <div >
    <ArticleCardsContainer articles = {articles}/>
    
   
    </div>
    <Footer/>
   </div>
  );
}

export default App;
