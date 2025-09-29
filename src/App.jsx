import React from 'react';
import Section1 from './components/Section1';
import items from './data/section1Items';

const App = () => {
  return (
    <div>
      <Section1 items={items} />
    </div>
  );
};

export default App;