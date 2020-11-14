/// <reference path="../../../../globals.d.ts" />
import Input from "../../../components/form/input";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

let input: Input;

beforeEach(() => {
    const props = {
        label: 'Имя',
        name: 'first_name',
        className: 'sign-form_input',
        type: 'text',
        value: 'Name',
        placeholder: 'Имя',
    }
    input = new Input(props);
})

test('render Input', () => {
    expect(input.renderToString()).toBe(`<div _key="uniq500000"><input name="first_name" class="sign-form_input" type="text" value="Name" placeholder="Имя"></div>`)
})