import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DeviceShowcase from './components/DeviceShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <DeviceShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;
