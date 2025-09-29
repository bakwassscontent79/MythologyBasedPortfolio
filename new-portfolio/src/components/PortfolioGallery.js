import React from 'react';
import '../App.css';

const PortfolioGallery = ({ items }) => {
  const handleCardClick = (type) => {
    if (type === 'cta') {
      window.open('https://wa.me/91916202815368', '_blank');
    }
  };

  return (
    <div className="portfolio-gallery">
      <div className="gallery-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`gallery-item ${item.type}`}
            onClick={() => handleCardClick(item.type)}
          >
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-subtitle">{item.subtitle}</p>
              <span className="item-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGallery;