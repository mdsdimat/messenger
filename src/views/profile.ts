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
    ]
});

render(".app", page);