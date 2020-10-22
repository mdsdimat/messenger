import Sign from "../components/signin.js";

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const page = new Sign({
    typeBackground: 'sign-background',
    title: 'Регистрация',
    fields: [
        {
            label: 'Имя',
            name: 'name',
            className: 'sign-form_input',
            type: 'text',
            value: 'Дима',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            className: 'sign-form_input',
            type: 'text',
            value: 'Димский',
        },
        {
            label: 'Логин',
            name: 'login',
            className: 'sign-form_input',
            type: 'text',
            value: 'dima',
        },
        {
            label: 'Почта',
            name: 'email',
            className: 'sign-form_input',
            type: 'text',
            value: 'dima@yandex.ru',
        },
        {
            label: 'Телефон',
            name: 'phone',
            className: 'sign-form_input',
            type: 'text',
            value: '+375291234567',
        },
        {
            label: 'Пароль',
            name: 'password',
            className: 'sign-form_input',
            type: 'password',
            value: 'password',
        },
        {
            label: 'Пароль (ещё раз)',
            name: 'confirm_password',
            className: 'sign-form_input',
            type: 'password',
            value: 'password',
        },
    ],
    buttons: [
        {
            type: 'submit',
            className: 'sign-form_button-block-form_submit',
            text: 'Зарегистрироваться',
        },
        {
            className: 'sign-form_button-block-form_cancel',
            text: 'Войти',
        }
    ],
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