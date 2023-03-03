import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://64022912f61d96ac4864b89d.mockapi.io/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const handleAddContact = async data => {
  const { data: result } = await contactsInstance.post('/', data);
  return result;
};

export const handleDeleteContact = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
