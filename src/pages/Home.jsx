import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshCw, Search, AlertCircle } from 'lucide-react';
import TopicSelector from '../components/TopicSelector';
import RepoCard from '../components/RepoCard';
import { setLoading, setError, setCurrentRepo, clearCurrentRepo } from '../store/repoSlice';
import { translations } from '../locales/translations';

const Home = () => {
  const dispatch = useDispatch();
  const { currentRepo, loading, error, history } = useSelector(state => state.repo);
  const lang = useSelector((state) => state.lang.current);
  const t = translations[lang];
  const [topic, setTopic] = useState('');

  const fetchRandomRepo = async (isRefresh = false) => {
    if (!topic) return;
    
    dispatch(setLoading(true));
    if (!isRefresh) {
      dispatch(clearCurrentRepo());
    }
    
    try {
      const encodedTopic = encodeURIComponent(topic.toLowerCase());
      const page = Math.floor(Math.random() * 3) + 1;
      
      const response = await fetch(`https://api.github.com/search/repositories?q=topic:${encodedTopic}&sort=stars&order=desc&per_page=100&page=${page}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories. Rate limit might be exceeded.');
      }
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const availableRepos = data.items.filter(repo => !history.includes(repo.id));
        
        let randomRepo;
        if (availableRepos.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableRepos.length);
          randomRepo = availableRepos[randomIndex];
        } else {
          const randomIndex = Math.floor(Math.random() * data.items.length);
          randomRepo = data.items[randomIndex];
        }
        
        dispatch(setCurrentRepo(randomRepo));
      } else {
        dispatch(setError(t.oops));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t.discoverTitle}</h2>
        <p className="text-muted mb-8">
          {t.discoverDesc}
        </p>
        
        <TopicSelector selectedTopic={topic} onChange={setTopic} />
        
        <div className="flex justify-center gap-4 mt-6">
          <button 
            className="btn" 
            onClick={() => fetchRandomRepo(false)} 
            disabled={!topic || loading}
          >
            {loading && !currentRepo ? <RefreshCw className="spinner" size={18} /> : <Search size={18} />}
            {t.findRandomBtn}
          </button>
          
          {currentRepo && (
            <button 
              className="btn btn-secondary" 
              onClick={() => fetchRandomRepo(true)}
              disabled={loading}
            >
              <RefreshCw className={loading ? "spinner" : ""} size={18} />
              {t.refreshBtn}
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl mt-4">
        {loading && !currentRepo && (
          <div className="flex flex-col items-center justify-center py-12 fade-in">
            <RefreshCw className="spinner mb-4" size={48} color="var(--primary-color)" />
            <p className="text-muted">{t.spinning}</p>
          </div>
        )}
        
        {error && (
          <div className="glass-card text-center fade-in" style={{ borderColor: '#ef4444' }}>
            <AlertCircle size={48} color="#ef4444" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.oops}</h3>
            <p className="text-muted">{error}</p>
          </div>
        )}

        {currentRepo && !loading && (
          <RepoCard repo={currentRepo} />
        )}
        
        {!currentRepo && !loading && !error && (
          <div className="glass-card text-center py-12 fade-in">
            <Search size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
            <p className="text-muted text-lg">{t.placeholderText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
