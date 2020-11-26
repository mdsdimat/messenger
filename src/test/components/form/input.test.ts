import Input from "../../../components/form/input";

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
    // eslint-disable-next-line max-len
    expect(input.renderToString()).toBe(`<div _key="uniq0"><input name="first_name" class="sign-form_input" type="text" value="Name" placeholder="Имя"></div>`)
})