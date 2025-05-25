import React from 'react';
import Header from './components/Header';
import PlayerForm from './components/PlayerForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative">
        <PlayerForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;