import Section from '../Section';
import ContactForm from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Logo from '../Logo';
import s from './App.module.css';

export default function App() {
  return (
    <div className={s.container}>
      <Logo />
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts">
        <Filter />
        <ContactList />
      </Section>
    </div>
  );
}
