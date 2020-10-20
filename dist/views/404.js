import ErrorPage from "../components/errorComponent.js";
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
const page = new ErrorPage({
    text: '404',
    desc: 'Не туда попали',
    linkText: 'Назад к чатам'
});
render(".app", page);
//# sourceMappingURL=404.js.map