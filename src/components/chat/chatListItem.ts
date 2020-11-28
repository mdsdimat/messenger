import Block from "modules/Block";

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
        return `<li id="{{this.id}}" class="chat_list_body_item">
                    <div class="chat_list_body_item_photo">
                        <img src="img/icons/ellipse.svg" alt="">
                    </div>
                    <div class="chat_list_body_item_message">
                        <div class="chat_list_body_item_message_name">{{this.name}}</div>
                        <div class="chat_list_body_item_message_content">{{this.text}}</div>
                    </div>
                    <div class="chat_list_body_item_desc">
                        <div class="chat_list_body_item_desc_date">{{this.time}}</div>
                        {{#if this.count}}
                           <div class="chat_list_body_item_desc_count">{{this.count}}</div>
                        {{/if}}
                    </div>
                </li>`;
    }


}