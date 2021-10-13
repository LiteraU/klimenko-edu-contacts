let allContacts = getAllContactsFromLocalStorage();

// ===========================Add localStorage support==========================

function getAllContactsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('contacts'));
}

function saveAllContactsToLocalStorage(contacts) {
    let stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
}

function saveContacts(contacts) {
    allContacts = contacts;
    saveAllContactsToLocalStorage(contacts);
}

//==============================================================================

// ===============Implement output of contacts on the page===============
let main = document.querySelector('.main');

function renderContact(contact) {
    return `<div class="mainBlock">
                <div class="avatar">
                    <img src="images/user-avatar-icon.svg" alt="avatar" width="80px" class="avatarIcon">
                </div>
                <div class="userInfo">
                    <div class="userName clamp">${contact.name}</div>
                    <div class="userCompany clamp">${contact.company}</div>
                </div>
                <div class="userAge clip">Возраст: ${contact.age}</div>
                <div class="userGender clip">Пол: ${contact.gender}</div>
                <button 
                class="edit btn" 
                data-bs-toggle="modal" 
                data-bs-target="#editUserModal"
                onclick="callEditContactModal(${contact.id})"
                >
                    <img src="images/edit-icon.svg" alt="edit" width="20">
                </button>
                <button 
                class="delete btn"
                data-bs-toggle="modal" 
                data-bs-target="#deleteUserModal"
                onclick="callConfirmDeleteModal(${contact.id})"
                >
                    <img src="images/delete-icon.svg" alt="delete" width="25">
                </button>
            </div>`;
}

function renderContacts(contacts) {
    return contacts.map(element => renderContact(element));
}

function displayContacts() {
    main.innerHTML = renderContacts(allContacts).join('');
}

displayContacts();
//=============================================================================

// ==========Implement a modal window for adding a new contact=================
function createContact(event) {
    event.preventDefault();

    let newContact = {
        id: + new Date(),
        name: event.target.elements.userName.value,
        company: event.target.elements.userCompany.value,
        age: event.target.elements.userAge.value,
        gender: event.target.elements.userGender.value
    };

    saveContacts([...allContacts, newContact]);
    displayContacts();

    document.getElementById('addUser').reset();

    return false;
}
//==============================================================================

// ==========Add the ability to delete a contact================================

function callConfirmDeleteModal(contactId) {
    let contact = allContacts.find(item => item.id === contactId);
    document.getElementById('deleteUserId').value = contact.id;
}

function deleteContact(event) {
    event.preventDefault();
    let deleteUserId = +document.getElementById('deleteUserId').value;
    let newContacts = allContacts.filter(element => element.id !== deleteUserId);
    saveContacts(newContacts);
    displayContacts();
}

//==============================================================================

// ==========Implement a modal window for edit contact==========================

function callEditContactModal(contactId) {
    let contact = allContacts.find(item => item.id === contactId);
    document.getElementById('editUserId').value = contact.id;
    document.getElementById('editUserName').value = contact.name;
    document.getElementById('editUserCompany').value = contact.company;
    document.getElementById('editUserAge').value = contact.age;
    document.getElementById('editUserGender').value = contact.gender;
}

function editContact(event) {
    event.preventDefault();

    let modifiedContact = {
        id: +event.target.elements.editUserId.value,
        name: event.target.elements.editUserName.value,
        company: event.target.elements.editUserCompany.value,
        age: +event.target.elements.editUserAge.value,
        gender: event.target.elements.editUserGender.value
    };

    let newContacts = allContacts.map(element => element.id === modifiedContact.id ? modifiedContact : element);
    saveContacts(newContacts);
    displayContacts();
}

//==============================================================================