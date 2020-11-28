import Block from "modules/Block";
import style from "css/chat.css";

export default class HeaderMenuItem extends Block {
    props: {
        actions: {
            onclick: () => void
        }
    };
    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    handleClick = (): void => {
        this.props.actions.onclick();
    }

    initEvents(block: Block): void {
        if (block._element) {
            block._element.addEventListener('click', this.handleClick);
        }
    }

    getTemplate(): string {
        return `<li>
                   <div class="${style.chatBodyMenuListItem}">
                       <div class="${style.chatBodyMenuListImg}">
                           <img src="{{this.icon}}" alt="">
                       </div>
                       <div class="${style.chatBodyMenuListText}">{{name}}</div>
                   </div>
               </li>`;
    }
}