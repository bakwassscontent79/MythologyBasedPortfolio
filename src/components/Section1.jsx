import React from 'react';
import { motion } from 'framer-motion';

const Section1 = ({ items = [] }) => {
  // Default fallback items if none provided
  const defaultItems = [
    {
      id: 1,
      title: "Universal Chatbot",
      subtitle: "Multi-industry AI assistant (Flask + Gemini UX)",
      img: "/images/projects/universal-chatbot.png",
      tag: "AI / Chatbot",
      href: "/projects/universal-chatbot",
      type: "project"
    },
    {
      id: 2,
      title: "ERP Inventory Manager",
      subtitle: "Accounting & stock workflows — idea & design",
      img: "/images/projects/erp-inventory.png",
      tag: "ERP / Automation",
      href: "/projects/erp-inventory",
      type: "project"
    },
    {
      id: 3,
      title: "Cybersecurity Suite",
      subtitle: "Ethical hacking tools for SMBs",
      img: "/images/projects/cybersec.png",
      tag: "CyberSec / Tools",
      href: "/projects/cybersec",
      type: "project"
    },
    {
      id: 4,
      title: "Business Automation",
      subtitle: "Workflow automation for local businesses",
      img: "/images/services/automation.png",
      tag: "Automation / n8n",
      href: "/services/automation",
      type: "service"
    },
    {
      id: 5,
      title: "Digital Branding",
      subtitle: "Transforming chai stalls to online brands",
      img: "/images/services/branding.png",
      tag: "Branding / Growth",
      href: "/services/branding",
      type: "service"
    },
    {
      id: 6,
      title: "Juicewala Transformation",
      subtitle: "From street vendor to online brand",
      img: "/images/projects/juicewala.png",
      tag: "E-commerce / Growth",
      href: "/projects/juicewala",
      type: "project"
    },
    {
      id: 7,
      title: "Dropshipping Empire",
      subtitle: "Full automation from supplier to customer",
      img: "/images/projects/dropshipping.png",
      tag: "Automation / E-commerce",
      href: "/projects/dropshipping",
      type: "project"
    },
    {
      id: 8,
      title: "Get a Quote",
      subtitle: "Start your digital transformation journey",
      img: "",
      tag: "CTA",
      href: "#quotePopup",
      type: "cta"
    }
  ];

  const galleryItems = items.length > 0 ? items : defaultItems;
  
  // Gallery container variants
  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.18
      }
    }
  };

  // Individual item variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      clipPath: "circle(0% at 50% 50%)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: "circle(75% at 50% 50%)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handle card click for CTA
  const handleCardClick = (href, type) => {
    if (type === 'cta' && href === '#quotePopup') {
      // Show the existing quote popup
      document.getElementById('quotePopup').style.display = 'flex';
    } else if (type === 'cta' && href.startsWith('https://wa.me/')) {
      // Open WhatsApp link directly
      window.open(href, '_blank');
    }
  };

  return (
    <motion.div 
      className="portfolio-gallery"
      variants={galleryVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.type === 'cta' && item.href !== '#quotePopup' ? undefined : item.href}
            className={`glass-card gallery-item ${item.type} ${!prefersReducedMotion ? 'wobble' : ''}`}
            variants={itemVariants}
            whileHover={!prefersReducedMotion ? "hover" : {}}
            whileFocus={!prefersReducedMotion ? "hover" : {}}
            aria-label={`${item.title} - ${item.tag}`}
            onClick={() => handleCardClick(item.href, item.type)}
            style={{
              animationDelay: prefersReducedMotion ? '0s' : `${index * 0.2}s`
            }}
          >
            <div className="item-image-container">
              {item.img ? (
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="placeholder-mandala" style={{ display: item.img ? 'none' : 'flex' }}>
                <svg viewBox="0 0 100 100" className="mandala-svg">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <text x="50" y="55" textAnchor="middle" fontSize="30" fill="currentColor">
                    {item.title.charAt(0)}
                  </text>
                </svg>
              </div>
            </div>
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-subtitle">{item.subtitle}</p>
              <span className="item-tag">{item.tag}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Section1;