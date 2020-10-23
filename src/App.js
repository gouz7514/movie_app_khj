import React from 'react';

function Food({fav}) {
  return <h3>I Love {fav}</h3>
}

function App() {
  return (
    <div className="App">
      <h1>HELLO</h1>
      <Food fav="kimchi" />
      <Food fav="you" />
    </div>
  );
}

export default App;