import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExploreRepos, resetExplore } from '../store/repoSlice';
import { translations } from '../locales/translations';
import RepoCard from '../components/RepoCard';
import SearchBar from '../components/SearchBar';
import TopicSelector from '../components/TopicSelector';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Explore = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.current);
  const t = translations[lang];
  
  const { items, loading, error, hasMore } = useSelector(state => state.repo.explore);
  
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [sort, setSort] = useState('stars');
  const [page, setPage] = useState(1);
  
  // Reset and fetch when filters change
  useEffect(() => {
    dispatch(resetExplore());
    // eslint-disable-next-line react-compiler/react-compiler
    setPage(1);
    dispatch(fetchExploreRepos({ query, topic, sort, page: 1 }));
  }, [query, topic, sort, dispatch]);
  
  useEffect(() => {
    if (page > 1) {
      dispatch(fetchExploreRepos({ query, topic, sort, page }));
    }
  }, [page, dispatch]);

  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      <div className="w-full text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t.explore}</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar placeholder={t.searchPlaceholder} onSearch={setQuery} />
          </div>
          <div className="flex-1">
            <TopicSelector selectedTopic={topic} onChange={setTopic} />
          </div>
          <div className="md:w-48">
            <label className="block mb-2 font-medium" style={{ textAlign: 'center' }}>{t.sortLabel}</label>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="select-input"
            >
              <option value="stars">{t.sortStars}</option>
              <option value="updated">{t.sortUpdated}</option>
            </select>
          </div>
        </div>
      </div>

      {error && page === 1 && (
        <ErrorMessage title={t.oops} message={error} />
      )}

      {!error && items.length === 0 && !loading && (
        <div className="text-center text-muted py-12 glass-card">
          {t.noResults}
        </div>
      )}

      <div className="repo-grid w-full">
        {items.map((repo, index) => {
          if (items.length === index + 1) {
            return <div ref={lastElementRef} key={repo.id}><RepoCard repo={repo} /></div>
          } else {
            return <RepoCard key={repo.id} repo={repo} />
          }
        })}
      </div>
      
      {loading && (
        <div className="w-full mt-8 flex justify-center">
          <Loader text={t.loadingMore} size={32} />
        </div>
      )}
    </div>
  );
};

export default Explore;
