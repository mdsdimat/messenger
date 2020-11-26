import Block from "../../modules/block";

export default class HeaderMenuItem extends Block {
    props: {
        actions: {
            onclick: () => void
        }
    };
    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    initEvents(block: Block): void {
        if (block._element) {
            block._element.onclick = () => {
                this.props.actions.onclick();
            }
        }
    }

    getTemplate(): string {
        return '<li>\n' +
            '       <div class="chat-body_menu-list_item">\n' +
            '           <div class="chat-body_menu-list_img">\n' +
            '               <img src="{{this.icon}}" alt="">\n' +
            '           </div>\n' +
            '           <div class="chat-body_menu-list_text">{{name}}</div>\n' +
            '       </div>\n' +
            '   </li>\n';
    }

}