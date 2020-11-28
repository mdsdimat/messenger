import Block from "modules/Block";
import style from "css/chat.css";

export default class ChatListItem extends Block {
    props: {
        actions: {
            onclick: (id: number) => void
        }
    };
    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    handleClick = (e: any): void => {
        const id = e.target.closest('li').id;
        this.props.actions.onclick(id);
    }

    initEvents(block: Block): void {
        if (block._element) {
            block._element.addEventListener('click', this.handleClick);
        }
    }

    getTemplate(): string {
        return `<li id="{{this.id}}" class="${style.chatListBodyItem}">
                    <div class="${style.chatListBodyItemPhoto}">
                        <img src="img/icons/ellipse.svg" alt="">
                    </div>
                    <div class="${style.chatListBodyItemMessage}">
                        <div class="${style.chatListBodyItemMessageName}">{{this.name}}</div>
                        <div class="${style.chatListBodyItemMessageContent}">{{this.text}}</div>
                    </div>
                    <div class="${style.chatListBodyItemDesc}">
                        <div class="${style.chatListBodyItemDescDate}">{{this.time}}</div>
                        {{#if this.count}}
                           <div class="${style.chatListBodyItemDescCount}">{{this.count}}</div>
                        {{/if}}
                    </div>
                </li>`;
    }


}