const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "db", "contacts.json")
//функция получения всех контактов
async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data)
    return contacts
}
// функция получения контакта по id
async function getContactById(contactId) {
    console.log(contactId)
    const arr = await listContacts();
    const contact = arr.find(e => e.id == contactId);
    if (!contact) {
        console.log(`contact by id=${contactId} is non found`);
        return
    }
    console.log(contact)
    return contact
}
// добавление контакта
async function addContact(name, email, phone) {
    const arr = await listContacts();
    const newContacts = {
        id: uuidv4(),
        name,
        email,
        phone,
    }
    arr.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(arr))
    console.log(newContacts);
}
// удаление контакта по id
async function removeContact(contactId) {
    const arr = await listContacts();
    const updataArr = arr.filter(e => e.id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updataArr));
    console.log(updataArr);
}

const fileOperation = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}

module.exports = fileOperation;

