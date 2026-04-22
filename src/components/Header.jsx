import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { setLanguage } from '../store/langSlice';
import { translations } from '../locales/translations';
import { Moon, Sun, Code } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const lang = useSelector((state) => state.lang.current);
  const t = translations[lang];

  return (
    <header className="header">
      <div className="flex items-center gap-4">
        <Code size={32} color="var(--primary-color)" />
        <h1>{t.title}</h1>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {t.home}
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {t.explore}
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {t.savedRepos}
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {t.about}
        </NavLink>
        
        <select 
          className="select-input" 
          style={{ width: 'auto', padding: '0.25rem 2rem 0.25rem 0.75rem', fontSize: '0.875rem' }}
          value={lang}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
        </select>

        <button className="theme-toggle" onClick={() => dispatch(toggleTheme())} aria-label="Toggle Theme">
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
