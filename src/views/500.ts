import ErrorPage from "../components/errorComponent.js";

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const page = new ErrorPage({
    text: '500',
    desc: 'Мы уже фиксим',
    linkText: 'Назад к чатам'
});

render(".app", page);