let allContacts = getAllContactsFromLocalStorage();
let searchedContacts = allContacts;
let filteredContacts = searchedContacts;
let sortedContacts = filteredContacts;

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
                    <img src="./images/user-avatar-icon.svg" alt="avatar" width="80px" class="avatarIcon">
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
                    <img src="./images/edit-icon.svg" alt="edit" width="20">
                </button>
                <button 
                class="delete btn"
                data-bs-toggle="modal" 
                data-bs-target="#deleteUserModal"
                onclick="callConfirmDeleteModal(${contact.id})"
                >
                    <img src="./images/delete-icon.svg" alt="delete" width="25">
                </button>
            </div>`;
}

function renderContacts(contacts) {
    return contacts.map(element => renderContact(element));
}

function displayAllContacts() {
    displayContacts(allContacts);
}

function displayContacts(contacts) {
    main.innerHTML = renderContacts(contacts).join('');
}

displayAllContacts();
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
    displayAllContacts();

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
    displayAllContacts();
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
    displayAllContacts();
}

//==============================================================================

// ===========================Add sorting by fields=============================

function byField(field) {
    return (first, second) => first[field] > second[field] ? 1 : -1;
}
function byReverseField(field) {
    return (first, second) => first[field] > second[field] ? -1 : 1;
}

function sortByFieldAndDirection(field, direction) {
    if (direction === 'DESC') {
        sortedContacts.sort(byReverseField(field));
    } else {
        sortedContacts.sort(byField(field));
    }
}

let sortIcons = document.querySelectorAll('.iconArrowSort');
let sortDirection = 'DESC';
let sortedByField = '';
let mappedSorter = ['name', 'company', 'age', 'gender'];

function clearAllSorterIcons(){
    for (let i = 0; i < mappedSorter.length; i++) {
        sortIcons[i].classList.add('iconArrowSortHidden')
    }
}

function changeActualSorter(field, direction) {
    let foundedIcon = sortIcons[mappedSorter.indexOf(field)];

    if (direction === 'DESC') {
        foundedIcon.classList.add('iconArrowSortReverse');
    } else {
        foundedIcon.classList.remove('iconArrowSortReverse');
    }
    foundedIcon.classList.remove('iconArrowSortHidden');
}

function changeSort(field) {
    if (field === sortedByField) {
        sortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
        sortDirection = 'DESC';
        sortedByField = field;
    }
    sortByFieldAndDirection(field, sortDirection);
    clearAllSorterIcons();
    changeActualSorter(field, sortDirection);
    displayContacts(sortedContacts);
}

//==============================================================================

// ====================Add search by name and by company========================
let searchInput = document.querySelector('.searchField');
function searchContact() {
    let searchValue = searchInput.value.trim().toLowerCase();
    displayContacts(searchContactsByPhrase(searchValue));
}

function searchContactsByPhrase(phrase) {
    searchedContacts = allContacts.filter(element => `${element.name} ${element.company}`.toLowerCase().includes(phrase));
    return searchedContacts;
}

//==============================================================================

// ======================Add filters by company and gender======================
let selectedCompany = '';
let selectedGender = '';
let filterCompany = document.querySelector('.filterCompany');

function renderCompaniesToFilter(element) {
    return `<option value="${element.company}">${element.company}</option>`
}

function filteringOfUniqueCompanies() {
    let allCompanies = allContacts.map(renderCompaniesToFilter);
    return Array.from(new Set(allCompanies));
}

function displayCompaniesToFilter() {
    filterCompany.innerHTML = `
    <option class="filterDefault" hidden>Выбрать компанию</option>
    ${filteringOfUniqueCompanies().join('')}
    <option value="allCompanies">Все</option>`
}
displayCompaniesToFilter();

//==============================================================================

function filterByGenderAndCompany(event) {
    let selectedFilter = event.target.value;
    let arrayForTheFilter = ['Женский', 'Мужской', 'Другой'];

    if (selectedFilter.includes('allGenders')) {
        selectedGender = '';
    } else if (selectedFilter.includes('allCompanies')) {
        selectedCompany = '';
    } else if (arrayForTheFilter.includes(selectedFilter)) {
        selectedGender = selectedFilter;
    } else {
        selectedCompany = selectedFilter;
    }

    let filteredByGender = searchedContacts.filter(contact => selectedGender.length === 0 || selectedGender.includes(contact.gender));
    let filteredByCompany = filteredByGender.filter(contact => selectedCompany.length === 0 || selectedCompany.includes(contact.company));

    sortedContacts = filteredByCompany;
    displayContacts(sortedContacts);
}

//==============================================================================

// ==============Add a button to clear filters, sort and search=================

function clearAll() {
    let filterDefault = document.querySelectorAll('.filterDefault');
    filterDefault[0].setAttribute('selected', true);
    filterDefault[1].setAttribute('selected', true);
    searchInput.value = '';
    clearAllSorterIcons();
    displayAllContacts();
}

//==============================================================================