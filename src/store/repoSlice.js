import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const loadSavedRepos = () => {
  try {
    const saved = localStorage.getItem('savedRepos');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const fetchExploreRepos = createAsyncThunk(
  'repo/fetchExploreRepos',
  async ({ query, topic, sort, page }, { rejectWithValue }) => {
    try {
      let q = '';
      if (query) q += `${query} `;
      if (topic) q += `topic:${topic} `;
      // If no query and no topic, just search for anything with stars > 100 to get random good repos
      if (!query && !topic) q += 'stars:>100 ';
      
      const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q.trim())}&sort=${sort}&order=desc&per_page=30&page=${page}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories. Rate limit might be exceeded.');
      }
      
      const data = await response.json();
      return { items: data.items, total_count: data.total_count, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const repoSlice = createSlice({
  name: 'repo',
  initialState: {
    // Random Home state
    currentRepo: null,
    loading: false,
    error: null,
    history: [],
    savedRepos: loadSavedRepos(),
    // Explore state
    explore: {
      items: [],
      loading: false,
      error: null,
      hasMore: true,
    }
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentRepo: (state, action) => {
      state.currentRepo = action.payload;
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.history.push(action.payload.id);
        if (state.history.length > 50) {
          state.history.shift();
        }
      }
    },
    clearCurrentRepo: (state) => {
      state.currentRepo = null;
    },
    toggleSaveRepo: (state, action) => {
      const repo = action.payload;
      const index = state.savedRepos.findIndex(r => r.id === repo.id);
      if (index >= 0) {
        state.savedRepos.splice(index, 1);
      } else {
        state.savedRepos.push(repo);
      }
      localStorage.setItem('savedRepos', JSON.stringify(state.savedRepos));
    },
    resetExplore: (state) => {
      state.explore.items = [];
      state.explore.hasMore = true;
      state.explore.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExploreRepos.pending, (state) => {
        state.explore.loading = true;
        state.explore.error = null;
      })
      .addCase(fetchExploreRepos.fulfilled, (state, action) => {
        state.explore.loading = false;
        if (action.payload.page === 1) {
          state.explore.items = action.payload.items;
        } else {
          // Filter out duplicates just in case
          const newItems = action.payload.items.filter(item => 
            !state.explore.items.some(existing => existing.id === item.id)
          );
          state.explore.items = [...state.explore.items, ...newItems];
        }
        state.explore.hasMore = action.payload.items.length > 0 && state.explore.items.length < action.payload.total_count;
      })
      .addCase(fetchExploreRepos.rejected, (state, action) => {
        state.explore.loading = false;
        state.explore.error = action.payload || 'An error occurred';
      });
  }
});

export const { setLoading, setError, setCurrentRepo, clearCurrentRepo, toggleSaveRepo, resetExplore } = repoSlice.actions;
export default repoSlice.reducer;
