import Block from "modules/Block";

export function render(query:string, block: Block): Element | null {
    const root = document.querySelector(query);
    if (root !== null) {
        root.appendChild(block.getContent());
    }
    Block.hydrate();
    return root;
}

export const getFormData = (className: string): FormData | undefined => {
    const form = <HTMLFormElement>document.querySelector(`.${className}`)
    if (form) {
        return new FormData(form);
    }
}