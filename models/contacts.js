const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const addContact = async (body) => {
  const contact = await listContacts(); 
  const newContact = {
    id: nanoid(),
    ...body,
  }
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 3));
  return newContact; 
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return contacts[index];
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
