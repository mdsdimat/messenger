import {render} from "modules/scripts";
import Block from "modules/Block";

interface IProps {
    rootQuery: string
}

export default class Route {
    private _pathname: string;
    private readonly _blockClass: any;
    private _block: Block|null;
    private _props: IProps
    
    constructor(pathname: string, view: any, props: IProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    getPathName(): string {
        return this._pathname;
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): Block|null|undefined {
        if (!this._block) {
            if (typeof this._blockClass === "function") {
                this._block = new this._blockClass();
            } else if (typeof this._blockClass === "object") {
                this._block = this._blockClass;
            }
            if (this._block) {
                render(this._props.rootQuery, this._block);
            }
            return this._block;
        }

        this._block.show(this._props.rootQuery);
    }
}