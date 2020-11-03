import Block from "./block.js";
import HTTPTransport, {METHODS} from "./transport.js";

export function render(query:string, block: Block) {
    const root = document.querySelector(query);
    if (root !== null) {
        root.appendChild(block.getContent());
    }
    Block.hydrate();
    return root;
}

export const submitForm = (className: string, url: string) => {
    const form = <HTMLFormElement>document.querySelector(`.${className}`)
    if (form) {
        const formData = new FormData(form);
        const requester = new HTTPTransport();
        const options = {
            method: METHODS.POST,
            data: formData
        }
        requester.post(url, options)
            .then((result: XMLHttpRequest) => {
                console.log(result.responseText)
            })


    }
}