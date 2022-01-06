const fileOperation = require('./contacts')

const argv = require('yargs').argv;

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case 'list':
            const contacts = await fileOperation.listContacts();
            console.log(contacts);
            break;
        case 'get':
            fileOperation.getContactById(id)
            break;
        case "add":
            fileOperation.addContact(name, email, phone);
            break;
        case "remove":
            fileOperation.removeContact(id);
            break;
        default: break;
    }
}

invokeAction(argv);