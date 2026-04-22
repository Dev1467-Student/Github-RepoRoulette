import React from 'react';
import { Star, GitFork, AlertCircle, Heart, HeartOff, ExternalLink } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveRepo } from '../store/repoSlice';

import { Link } from 'react-router-dom';

const RepoCard = ({ repo }) => {
  const dispatch = useDispatch();
  const savedRepos = useSelector(state => state.repo.savedRepos);
  const isSaved = savedRepos.some(r => r.id === repo.id);

  if (!repo) return null;

  return (
    <div className="glass-card fade-in flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <Link to={`/repo/${repo.owner.login}/${repo.name}`} className="nav-link flex items-center gap-2">
              {repo.full_name}
            </Link>
          </h2>
          {repo.language && <span className="badge">{repo.language}</span>}
        </div>
        <button 
          onClick={() => dispatch(toggleSaveRepo(repo))}
          className="theme-toggle" 
          style={{ color: isSaved ? '#ef4444' : 'var(--text-color)' }}
          title={isSaved ? "Remove from saved" : "Save repository"}
        >
          {isSaved ? <Heart size={24} fill="#ef4444" /> : <Heart size={24} />}
        </button>
      </div>
      
      <p className="mb-6" style={{ minHeight: '3rem', color: 'var(--text-muted)' }}>
        {repo.description || "No description provided for this repository."}
      </p>
      
      <div className="flex justify-around mt-auto border-t border-[var(--card-border)] pt-4">
        <div className="flex flex-col items-center gap-1" title="Stars">
          <Star size={20} style={{ color: '#eab308' }} />
          <span className="text-sm font-semibold">{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center gap-1" title="Forks">
          <GitFork size={20} />
          <span className="text-sm font-semibold">{repo.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center gap-1" title="Open Issues">
          <AlertCircle size={20} />
          <span className="text-sm font-semibold">{repo.open_issues_count.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
