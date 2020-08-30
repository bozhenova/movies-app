import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb_top250';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { SET_MOVIES, SET_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    searchMode: false
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesLength: ({ top250IDs }) => Object.keys(top250IDs).length,
    searchMode: ({ searchMode }) => searchMode
  },
  mutations: {
    [SET_MOVIES](state, value) {
      state.movies = value;
    },
    [SET_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.searchMode = bool;
    }
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch('fetchMovies');
      },
      root: true
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { currentPage, moviesPerPage, slicedIDs } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);
        commit(SET_MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(SET_PAGE, page);
      dispatch('fetchMovies');
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250IDs.findIndex(item => item === id);
      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('fetchMovies');
      }
    },
    async searchMovies({ commit, dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const response = await axios.get(`/?s=${query}`);
        if (response.Error) {
          throw Error(response.Error);
        }
        const movies = serializeResponse(response.Search);
        commit(SET_MOVIES, movies);
      } catch (err) {
        dispatch(
          'showNotification',
          {
            message: err.message,
            title: 'Error',
            variant: 'danger'
          },
          { root: true }
        );
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    toggleSearchMode({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    }
  }
};

export default moviesStore;
