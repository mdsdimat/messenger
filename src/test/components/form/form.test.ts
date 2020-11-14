/// <reference path="../../../../globals.d.ts" />
import Form from "../../../components/form/form";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

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
        `<div _key="uniq500000"><form class="js-form">\n` +
            `        <div class="modal-window_buttons">\n` +
            `        </div>\n` +
            `    </form></div>`)
})