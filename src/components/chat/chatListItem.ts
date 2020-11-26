import Block from "../../modules/block";

export default class ChatListItem extends Block {
    props: {
        actions: {
            onclick: (id: number) => void
        }
    };
    constructor(props: Record<string, unknown>) {
        super("div", props);
    }

    initEvents(block: Block): void {
        if (block._element) {
            block._element.onclick = (e: any) => {
                const id = e.target.closest('li').id;
                this.props.actions.onclick(id);
            }
        }
    }

    getTemplate(): string {
        return '             <li id="{{this.id}}" class="chat_list_body_item">\n' +
            '                    <div class="chat_list_body_item_photo">\n' +
            '                        <img src="img/icons/ellipse.svg" alt="">\n' +
            '                    </div>\n' +
            '                    <div class="chat_list_body_item_message">\n' +
            '                        <div class="chat_list_body_item_message_name">{{this.name}}</div>\n' +
            '                        <div class="chat_list_body_item_message_content">{{this.text}}</div>\n' +
            '                    </div>\n' +
            '                    <div class="chat_list_body_item_desc">\n' +
            '                        <div class="chat_list_body_item_desc_date">{{this.time}}</div>\n' +
            '                        {{#if this.count}}\n' +
            '                           <div class="chat_list_body_item_desc_count">{{this.count}}</div>\n' +
            '                        {{/if}}\n' +
            '                    </div>\n' +
            '                </li>\n';
    }


}