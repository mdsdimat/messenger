/// <reference path="../../../../globals.d.ts" />
import Button from "../../../components/form/button";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

let input: Button;

beforeEach(() => {
    const props = {
        type: 'submit',
        className: 'sign-form_button-block-form_submit',
        text: 'Зарегистрироваться',
    }
    input = new Button(props);
})

test('render Button', () => {
    expect(input.renderToString()).toBe(`<div _key="uniq500000"><button type="submit" class="sign-form_button-block-form_submit">Зарегистрироваться</button></div>`)
})