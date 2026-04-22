import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Star, GitFork, AlertCircle, ExternalLink, ArrowLeft, Heart } from 'lucide-react';
import { translations } from '../locales/translations';
import RepoCard from '../components/RepoCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { toggleSaveRepo } from '../store/repoSlice';

const RepoDetails = () => {
  const { owner, repoName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const lang = useSelector((state) => state.lang.current);
  const t = translations[lang];
  const savedRepos = useSelector(state => state.repo.savedRepos);
  
  const [repo, setRepo] = useState(null);
  const [similarRepos, setSimilarRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isSaved = repo ? savedRepos.some(r => r.id === repo.id) : false;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
        if (!res.ok) throw new Error('Repository not found or API rate limit exceeded.');
        const data = await res.json();
        setRepo(data);
        
        let query = '';
        if (data.topics && data.topics.length > 0) {
          query = `topic:${data.topics[0]}`;
        } else if (data.language) {
          query = `language:${data.language}`;
        } else {
          query = `stars:>100`;
        }
        
        const simRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=4`);
        if (simRes.ok) {
          const simData = await simRes.json();
          setSimilarRepos(simData.items.filter(r => r.id !== data.id).slice(0, 3));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [owner, repoName]);

  if (loading) return <Loader text="Loading repository details..." />;
  if (error) return <ErrorMessage title="Error" message={error} />;
  if (!repo) return null;

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-secondary mb-6"
      >
        <ArrowLeft size={18} /> {t.back}
      </button>
      
      <div className="glass-card mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              {repo.full_name}
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary-color hover:text-primary-hover" title="Open in GitHub">
                <ExternalLink size={24} />
              </a>
            </h1>
            <div className="flex flex-row flex-wrap items-center gap-2 mt-3">
              {repo.language && <span className="badge">{repo.language}</span>}
              {repo.topics && repo.topics.map(topic => (
                <span key={topic} className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => dispatch(toggleSaveRepo(repo))}
            className="theme-toggle" 
            style={{ color: isSaved ? '#ef4444' : 'var(--text-color)' }}
            title={isSaved ? "Remove from saved" : "Save repository"}
          >
            {isSaved ? <Heart size={32} fill="#ef4444" /> : <Heart size={32} />}
          </button>
        </div>
        
        <p className="text-lg text-muted mb-8">
          {repo.description || "No description provided."}
        </p>
        
        <div className="flex justify-around mt-8 border-t border-[var(--card-border)] pt-8 flex-wrap gap-4">
          <div className="flex flex-col items-center gap-2" title="Stars">
            <Star size={32} style={{ color: '#eab308' }} />
            <span className="text-xl font-bold mt-2">{repo.stargazers_count.toLocaleString()}</span>
            <span className="text-sm text-muted">Stars</span>
          </div>
          <div className="flex flex-col items-center gap-2" title="Forks">
            <GitFork size={32} />
            <span className="text-xl font-bold mt-2">{repo.forks_count.toLocaleString()}</span>
            <span className="text-sm text-muted">Forks</span>
          </div>
          <div className="flex flex-col items-center gap-2" title="Open Issues">
            <AlertCircle size={32} />
            <span className="text-xl font-bold mt-2">{repo.open_issues_count.toLocaleString()}</span>
            <span className="text-sm text-muted">Issues</span>
          </div>
        </div>
      </div>
      
      {similarRepos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{t.similarRepos}</h2>
          <div className="repo-grid">
            {similarRepos.map(simRepo => (
              <RepoCard key={simRepo.id} repo={simRepo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoDetails;
