import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import SavedRepos from './pages/SavedRepos';
import Explore from './pages/Explore';
import About from './pages/About';
import RepoDetails from './pages/RepoDetails';
import Footer from './components/Footer';

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const lang = useSelector((state) => state.lang.current);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/Github-RepoRoulette" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<SavedRepos />} />
          <Route path="/about" element={<About />} />
          <Route path="/repo/:owner/:repoName" element={<RepoDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
