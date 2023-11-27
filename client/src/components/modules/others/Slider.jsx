import React, { useState, useEffect } from 'react';
import style from './Slider.module.css';

const Slider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Función para obtener las imágenes desde la API
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3333/user/images');
        if (response.ok) {
          const data = await response.json();
          let resFilter = (data.body).map(el => el.name)    
          console.log(resFilter);
          setImages(resFilter);
        }
      } catch (error) {
        console.error('Error al cargar las imágenes desde la API', error);
      }
    };
    fetchImages();
  }, []);




  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className={style.Slider} onClick={nextSlide}>
      
      {images.length > 0 && (
        <img src={`http://localhost:3333/${images[currentIndex]}`} alt={`Imagen ${currentIndex + 1}`} />
      )}
      
    </div>
  );
};

export default Slider;