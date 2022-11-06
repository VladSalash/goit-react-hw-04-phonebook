import { useState } from 'react';
import { nanoid } from 'nanoid';

import useLocalStorage from './hooks/useLocalStorage';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const AddContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const existContact = contacts.find(contact => contact.name === name);

    if (existContact) {
      alert(`${contact.name}, is already in your contacts`);
      return;
    }

    setContacts(contacts => [contact, ...contacts]);
  };

  const filterContacts = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={AddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} inputFilterContact={filterContacts} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
