import React from 'react';
import Header from './components/Header';
import PlayerForm from './components/PlayerForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <PlayerForm />
      <Footer />
    </div>
  );
}

export default App;