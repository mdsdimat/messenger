/// <reference path="../../../../globals.d.ts" />
import Button from "../../../components/form/button";

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
    expect(input.renderToString()).toBe(`<div _key="uniq0"><button type="submit" class="sign-form_button-block-form_submit">Зарегистрироваться</button></div>`)
})