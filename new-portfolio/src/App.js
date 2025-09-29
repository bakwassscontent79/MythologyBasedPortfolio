import React from 'react';
import PortfolioGallery from './components/PortfolioGallery';
import portfolioItems from './data/portfolioItems';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aniket Prashar: The Business Transformer</h1>
        <div className="hero-content">
          <p>
            I don't just build websites. I turn chai stalls into digital brands.
          </p>
          <p>
            I turn small hustles into internet blasters. I build futures.
          </p>
          <p className="shloka-text">मैं समय हूँ</p>
        </div>
      </header>
      
      <section className="about-section">
        <h2>Who Am I? <span className="subtitle">(The Arjuna Mode)</span></h2>
        <p>I'm Aniket Prashar — <span className="highlight">hackathon warrior</span>, <span className="highlight">web developer</span>, builder of 50+ digital realms, problem solver, and modern-day Vishwakarma.</p>
        <p>I've worked with clients in Dubai & America, co-created ERP + Inventory systems, delivered a government report for Bihar, automated dropshipping stores with n8n, and freelanced across industries.</p>
        <p>I've been a <span className="highlight">data analyst at Amazon</span>, supported IFB & Havells, and mastered tools from Power BI to BurpSuite.</p>
        <p className="dharma">But my real dharma?<br />
        👉 Empowering the <span className="highlight">chaiwala, mithaiwala, thelewala</span> with the same digital shakti as Fortune 500 founders.<br />
        For me, everyone is a <span className="highlight">businessman</span>. Everyone deserves the internet spotlight.</p>
      </section>
      
      <PortfolioGallery items={portfolioItems} />
    </div>
  );
}

export default App;