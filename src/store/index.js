import {configureStore, createSlice } from '@reduxjs/toolkit'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const articleSlice = createSlice({
    name: 'article',
    initialState: [],
    reducers:{
        addArticles(state, action) {
            state[0] = (action.payload);
            return;
        },

    }
});

const articleFilterSlice = createSlice({
    name: 'articleFilter',
    initialState: ['', null, null],
    reducers:{
        addArticleFilter(state, action) {
            state[0] = (action.payload);
            return;
        },
        addSearchItem(state, action) {
          state[1] = (action.payload);
          return;
      },
      setFilterItem(state, action) {
        state[2] = (action.payload);
        return;
    },
    }
});
const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: JSON.parse(userToken),
    },
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        localStorage.clear();
        state.user = null;
      },
    },
  });

  

const store = configureStore({
    reducer:{
        article: articleSlice.reducer,
        articleFilter: articleFilterSlice.reducer,
        user: userSlice.reducer
    }
});


store.dispatch(
    articleSlice.actions.addArticles(),
    articleFilterSlice.actions.addArticleFilter(),
    articleFilterSlice.actions.addSearchItem(),
    articleFilterSlice.actions.setFilterItem(),
    userSlice.actions.login(),
    userSlice.actions.logout()
);

export { store }; 
export const { addArticles } = articleSlice.actions 
export const { addArticleFilter, addSearchItem, setFilterItem } = articleFilterSlice.actions 
export const { login, logout } = userSlice.actions 