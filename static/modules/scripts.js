import Block from "./block.js";
export function render(query, block) {
    const root = document.querySelector(query);
    if (root !== null) {
        root.appendChild(block.getContent());
    }
    Block.hydrate();
    return root;
}
//# sourceMappingURL=scripts.js.map