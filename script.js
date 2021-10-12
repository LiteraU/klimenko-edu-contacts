let contacts = [
    {id: 1, name: 'Артём', company: 'Google', age: 36, gender: 'Мужской'},
    {id: 2, name: 'Никита', company: 'Facebook', age: 21, gender: 'Мужской'},
    {id: 3, name: 'Алексей', company: 'Google', age: 29, gender: 'Мужской'},
    {id: 4, name: 'Олег', company: 'Amazon', age: 21, gender: 'Мужской'},
    {id: 5, name: 'Инна', company: 'Amazon', age: 23, gender: 'Женский'},
    {id: 6, name: 'Анна', company: 'Google', age: 46, gender: 'Женский'},
    {id: 7, name: 'Георгий', company: 'Facebook', age: 24, gender: 'Мужской'},
    {id: 8, name: 'Елизавета', company: 'Facebook', age: 54, gender: 'Женский'},
    {id: 9, name: 'Kate', company: 'Google', age: 18, gender: 'Женский'},
    {id: 10, name: 'John', company: 'Amazon', age: 24, gender: 'Мужской'}
];

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
    main.innerHTML = renderContacts(contacts).join('');
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
    contacts.push(newContact);
    displayContacts();

    document.getElementById('addUser').reset();

    return false;
}
//==============================================================================

// ==========Add the ability to delete a contact================================

function callConfirmDeleteModal(contactId) {
    let contact = contacts.find(item => item.id === contactId);
    document.getElementById('deleteUserId').value = contact.id;
}

function deleteContact(event) {
    event.preventDefault();
    let deleteUserId = +document.getElementById('deleteUserId').value;
    contacts = contacts.filter(element => element.id !== deleteUserId);
    displayContacts();
}

//==============================================================================

// ==========Implement a modal window for edit contact==========================

function callEditContactModal(contactId) {
    let contact = contacts.find(item => item.id === contactId);
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

    contacts = contacts.map(element => element.id === modifiedContact.id ? modifiedContact : element);
    displayContacts();
}

//==============================================================================