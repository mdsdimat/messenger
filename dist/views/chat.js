import ErrorPage from "../components/chatList.js";
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
const page = new ErrorPage({
    users: [
        {
            name: 'Андрей',
            text: 'Сообщение',
            time: '11:15',
        },
        {
            name: 'Валера',
            text: 'Как дела?',
            time: '11:15',
            count: 2,
        },
        {
            name: 'Сергей',
            text: 'Нормально',
            time: '11:15',
        },
    ],
});
render(".app", page);
//# sourceMappingURL=chat.js.map