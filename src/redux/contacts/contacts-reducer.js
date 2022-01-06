import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { notificate } from '../../helpers/notifications';
import actions from './contacts-actions';

const items = createReducer([], {
  [actions.addContact]: (state, { payload }) => {
    const nameDublicate = state.find(contact => contact.name === payload.name);
    const numberDublicate = state.find(
      contact => contact.number === payload.number,
    );
    if (nameDublicate) {
      notificate(payload.name);
      return;
    } else if (numberDublicate) {
      notificate(payload.number);
      return;
    }
    return [...state, payload];
  },

  [actions.deleteContact]: (state, { payload }) => {
    return state.filter(({ id }) => id !== payload);
  },

  [actions.changeContactName]: (state, { payload }) => {
    return state.map(contact =>
      contact.id === payload.id ? { ...contact, name: payload.value } : contact,
    );
  },

  [actions.changeContactNumber]: (state, { payload }) => {
    return state.map(contact =>
      contact.id === payload.id
        ? { ...contact, number: payload.value }
        : contact,
    );
  },

  [actions.ordered]: (_, { payload }) => [...payload],
});

const filter = createReducer('', {
  [actions.filter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
