import Form from "../../../components/form/form";

let input: Form;

beforeEach(() => {
    const props = {
        buttonsClassName: 'modal-window_buttons',
        formClassName: 'js-form',
    }
    input = new Form(props, '', '');
})

test('render Form', () => {
    expect(input.renderToString()).toBe(
        `<div _key="uniq0"><form class="js-form">\n` +
            `        <div class="modal-window_buttons">\n` +
            `        </div>\n` +
            `    </form></div>adfasfasdfa`)
})