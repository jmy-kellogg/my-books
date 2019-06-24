/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: !!localStorage.getItem('token'),
    accessType: 'free',
    categories: [],
    books: [],
    message: {},
  },
  getters: {
    isPremium(state) {
      return state.accessType === 'premium';
    },
    isLoggedIn(state) {
      return state.authenticated;
    },
  },
  mutations: {
    SETACCESSTYPE: (state, payload) => {
      state.accessType = payload || 'free';
    },
    SETCATEGORIES(state, payload) {
      state.categories = payload || [];
    },
    SETBOOKS(state, payload) {
      state.books = payload || [];
    },
    LOGIN(state) {
      state.authenticated = true;
    },
    LOGOUT(state) {
      state.authenticated = false;
      state.accessType = 'free';
    },
    SETMESSAGE(state, payload) {
      state.message = payload;
    },
  },
  actions: {
    async login(context, input) {
      try {
        const { data } = await axios.post('https://ancient-springs-73658.herokuapp.com/auth');
        if (data.status === 'success') {
          localStorage.setItem('token', uuid());
          context.commit('LOGIN');
          context.dispatch('fetchAccessType', input);
        } else {
          context.commit('SETMESSAGE', { message: 'The username and / or password is incorrect', type: 'warning' });
        }
        return data;
      } catch (error) {
        const message = { message: 'Something went wrong with the server', type: 'warning' };
        context.commit('SETMESSAGE', message);
        return message;
      }
    },
    async fetchAccessType(context, input) {
      try {
        const { data } = await axios.get('https://ancient-springs-73658.herokuapp.com/me');
        context.commit('SETACCESSTYPE', data.access_type);
        // For Purposes this challenge hard coding premium type for easier access
        if (input.username === 'admin' && input.password === 'premium') {
          context.commit('SETACCESSTYPE', 'premium');
        }
      } catch (error) {
        const message = { message: 'Something went wrong with the server. Try refreshing page', type: 'warning' };
        context.commit('SETMESSAGE', message);
      }
    },
    async fetchCategories(context) {
      try {
        const { data } = await axios.get(
          'https://ancient-springs-73658.herokuapp.com/categories',
        );
        context.commit('SETCATEGORIES', data.categories);
      } catch (error) {
        const message = { message: 'Could not get Categories. Try refreshing page', type: 'warning' };
        context.commit('SETMESSAGE', message);
      }
    },
    async fetchBooks(context) {
      try {
        const { data } = await axios.get(
          'https://ancient-springs-73658.herokuapp.com/books',
        );
        context.commit('SETBOOKS', data.books);
      } catch (error) {
        const message = { message: 'Could not get Books. Try refreshing page', type: 'warning' };
        context.commit('SETMESSAGE', message);
      }
    },
    logout(context) {
      localStorage.removeItem('token');
      context.commit('LOGOUT');
    },
  },
});
