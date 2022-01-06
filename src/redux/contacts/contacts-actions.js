import { nanoid } from 'nanoid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/add', ({ name, number }) => ({
  payload: {
    id: nanoid(),
    name,
    number,
  },
}));
const deleteContact = createAction('contacts/delete');
const changeContactName = createAction('contacts/changeName');
const changeContactNumber = createAction('contacts/changeNumber');
const filter = createAction('contacts/filter');
const ordered = createAction('contacts/ordered');

const contactsActions = {
  addContact,
  deleteContact,
  filter,
  ordered,
  changeContactName,
  changeContactNumber,
};
export default contactsActions;
