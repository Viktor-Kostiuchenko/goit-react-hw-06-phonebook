import { useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import Section from '../Section';
import ContactForm from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Logo from '../Logo';
import { notificate } from '../../helpers/notifications';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Viktor Kost', number: '221-19-88' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const nameDublicate = contacts.find(contact => contact.name === name);
    const numberDublicate = contacts.find(contact => contact.number === number);

    if (nameDublicate) {
      notificate(name);
      return;
    } else if (numberDublicate) {
      notificate(number);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const filterByName = ({ target: { value } }) => {
    setFilter(value);
  };

  const showFiltered = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  }, [contacts, filter]);

  return (
    <div className={s.container}>
      <Logo />
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={filterByName} />
        <ContactList contacts={showFiltered} onDeleteContact={deleteContact} />
      </Section>
    </div>
  );
}
