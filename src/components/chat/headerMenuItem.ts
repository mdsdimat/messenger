import Block from "modules/Block";

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
                   <div class="chat-body_menu-list_item">
                       <div class="chat-body_menu-list_img">
                           <img src="{{this.icon}}" alt="">
                       </div>
                       <div class="chat-body_menu-list_text">{{name}}</div>
                   </div>
               </li>`;
    }
}