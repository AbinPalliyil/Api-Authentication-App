import React from 'react';
import Header from './Header';

function App(props) {
  return (
    <div className="App">
    <Header />
    {props.children}
    </div>
  );
}

export default App;
