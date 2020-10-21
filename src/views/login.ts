import Login from "../components/login.js";

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const page = new Login({
    title: 'Вход',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            className: 'sign-form_input',
            type: 'text',
            value: 'test@test.re',
        },
        {
            label: 'Пароль',
            name: 'password',
            className: 'sign-form_input',
            type: 'password',
            value: '123456',
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