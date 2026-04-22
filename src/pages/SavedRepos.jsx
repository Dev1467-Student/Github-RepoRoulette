import React from 'react';
import { useSelector } from 'react-redux';
import RepoCard from '../components/RepoCard';
import { Heart } from 'lucide-react';
import { translations } from '../locales/translations';

const SavedRepos = () => {
  const savedRepos = useSelector(state => state.repo.savedRepos);
  const lang = useSelector((state) => state.lang.current);
  const t = translations[lang];

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Heart fill="#ef4444" color="#ef4444" /> {t.savedTitle}
        </h2>
        <p className="text-muted">
          {t.savedDesc}
        </p>
      </div>

      {savedRepos.length === 0 ? (
        <div className="glass-card text-center py-16 max-w-2xl mx-auto">
          <Heart size={64} className="mx-auto mb-4" style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
          <h3 className="text-xl font-bold mb-2">{t.noSavedTitle}</h3>
          <p className="text-muted">
            {t.noSavedDesc}
          </p>
        </div>
      ) : (
        <div className="repo-grid">
          {savedRepos.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRepos;
