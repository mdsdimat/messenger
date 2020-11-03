import Block from "../block.js";
import {render} from "../scripts.js"

interface IProps {
    rootQuery: string
}

export default class Route {
    private _pathname: string;
    private readonly _blockClass: any;
    private _block: Block|null;
    private _props: IProps
    
    constructor(pathname: string, view: Block, props: IProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    getPathName() {
        return this._pathname;
    }

    leave() {
        if (this._block) {
            this._block.hide();
            const node = document.querySelector(`[_key=${this._block.getId()}`);
            if (node) {
                node.remove();
            }
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            if (this._block) {
                render(this._props.rootQuery, this._block);
            }
            return;
        }

        this._block.show();
    }
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}