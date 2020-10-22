import Profile from "../components/profile.js";

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const page = new Profile({
    photo: 'img/profilePhoto.svg',
    name: 'Дима',
    fields: [
        {
            name: 'email',
            className: 'field_input',
            type: 'text',
            placeholder: 'Почта',
        },
        {
            name: 'login',
            className: 'field_input',
            type: 'text',
            placeholder: 'Логин',
        }
    ],
    buttonsClassName: '',
    buttons: [
        {
            className: 'field_button',
            type: 'submit',
            text: 'Изменить данные',
            parentClass: 'field-border',
        },
        {
            className: 'field_button button-error',
            text: 'Выйти',
        },
    ]
});

render(".app", page);

const element = document.getElementsByClassName('js-form');
element[0].addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }
});