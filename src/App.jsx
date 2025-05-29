import React, {useState} from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DeviceShowcase from './components/DeviceShowcase';
import Footer from './components/Footer';
import About from './components/About';
import AuthContext from './components/context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      <div className="min-h-screen bg-charcoal text-white flex flex-col">
        <Header />
        <Hero />
        <Features/>
        <About />
        <DeviceShowcase />
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </div>
    </AuthContext.Provider>
  );
}

export default App;
