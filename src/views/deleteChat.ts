import Chat from "../components/chat.js";

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const page = new Chat({
    isShowDeleteModal: true,
    list: {
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
    },
    body: {
        isShow: true,
        header: {
            name: 'Андрей',
            desc: 'Был в сети 5 минут назад'
        },
        body: {
            messages: [
                {
                    self: false,
                    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической\n' +
                        '                    истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n' +
                        '                    Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер\n' +
                        '                    все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
                        '\n' +
                        '                    Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда\n' +
                        '                    и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000\n' +
                        '                    евро.',
                    time: '11:56'
                },
                {
                    self: false,
                    img: 'img/jonas-allert-Rpz-455NaQw-unsplash.jpg',
                    time: '11:56'
                },
                {
                    self: true,
                    text: 'Круто!',
                    time: '11:56'
                }
            ]
        }
    }
});

render(".app", page);