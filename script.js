let contacts = [
    {id: 1, name: 'Артём ваиовлт ввтствстыв', company: 'Google', age: 36, gender: 'Мужской'},
    {id: 2, name: 'Никита', company: 'Facebook', age: 21, gender: 'Мужской'},
    {id: 3, name: 'Алексей', company: 'Google', age: 29, gender: 'Мужской'},
    {id: 4, name: 'Олег', company: 'Amazon', age: 21, gender: 'Мужской'},
    {id: 5, name: 'Инна', company: 'Amazon', age: 23, gender: 'Женский'},
    {id: 6, name: 'Анна', company: 'Google', age: 46, gender: 'Женский'},
    {id: 7, name: 'Георгий', company: 'Facebook', age: 24, gender: 'Мужской'},
    {id: 8, name: 'Елизавета', company: 'Facebook', age: 54, gender: 'Женский'},
    {id: 9, name: 'Kate', company: 'Google', age: 18, gender: 'Женский'},
    {id: 10, name: 'John', company: 'Amazon', age: 24, gender: 'Мужской'}
]

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
                <button class="edit">
                    <img src="images/edit-icon.svg" alt="edit" width="20">
                </button>
                <button class="delete">
                    <img src="images/delete-icon.svg" alt="delete" width="25">
                </button>
            </div>`
}

function renderContacts(contacts) {
    return contacts.map(element => renderContact(element));
}

main.innerHTML = renderContacts(contacts).join('');
