import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PhonebookForm from '../components/Phonebook/PhonebookForm';
import Filter from '../components/Phonebook/Filter';
import ContactsList from '../components/Phonebook/ContactsList';

import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contacts/contacts-operations';
import { setFilter } from '../redux/filter/filter-slice';

import { getFilteredContacts } from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

const ContactsPage = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isName = Boolean(filteredContacts.length);

  return (
    <>
      <PhonebookForm onSubmit={handleAddContact} />
      <Filter value={filter} handleChange={handleFilter} />
      {isName && (
        <ContactsList
          deleteName={handleDeleteContact}
          contacts={filteredContacts}
        />
      )}
    </>
  );
};

export default ContactsPage;
